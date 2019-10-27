"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const config_1 = require("./config");
const EmbedVideo_1 = require("./EmbedVideo");
const remark_burger_1 = __importDefault(require("remark-burger"));
const visit = require(`unist-util-visit`);
const overrideDefaultOptions = (options) => {
    const videoOptions = Object.assign(Object.assign({}, config_1.defaultOptions), options);
    if (!videoOptions.height) {
        videoOptions.height = Math.round(videoOptions.width / videoOptions.ratio);
    }
    return videoOptions;
};
const addVideoIframe = ({ markdownAST }, options) => {
    options = overrideDefaultOptions(options);
    const match = (node, v) => {
        const keywords = [...config_1.knownPlatforms(), 'video'].join('|');
        const re = new RegExp(`\(${keywords}\):\(\.\*\)`, 'i');
        const processValue = v.match(re);
        if (processValue) {
            const type = processValue[1];
            const id = processValue[2].trim();
            node.type = `html`;
            node.value = EmbedVideo_1.embedVideoHTML(type, id, options);
        }
    };
    const { beginMarker, endMarker } = options;
    if (beginMarker || endMarker) {
        visit(markdownAST, `embedVideo`, (node) => {
            const { data } = node;
            match(node, data.content);
        });
    }
    else {
        visit(markdownAST, `inlineCode`, (node) => {
            const { value } = node;
            match(node, value);
        });
    }
};
const setParserPlugins = (options) => {
    options = overrideDefaultOptions(options);
    const { beginMarker, endMarker } = options;
    return [[remark_burger_1.default, { beginMarker, endMarker, onlyRunWithMarker: true, pattyName: 'embedVideo' }]];
};
addVideoIframe.setParserPlugins = setParserPlugins;
module.exports = addVideoIframe;
