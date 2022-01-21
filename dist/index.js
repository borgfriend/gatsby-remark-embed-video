"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const config_1 = require("./config");
const EmbedVideo_1 = require("./EmbedVideo");
const remark_burger_1 = __importDefault(require("remark-burger"));
const indexHelpers_1 = require("./indexHelpers");
const unist_util_visit_1 = require("unist-util-visit");
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
        const keywords = [...(0, config_1.knownPlatforms)(), "video"].join("|");
        const re = new RegExp(`\(${keywords}\):\(\.\*\)`, "i");
        const processValue = v.match(re);
        if (processValue) {
            const type = processValue[1];
            const { id, title } = (0, indexHelpers_1.readTitle)(processValue[2].trim());
            options = Object.assign(Object.assign({}, options), { title });
            node.type = `html`;
            node.value = (0, EmbedVideo_1.embedVideoHTML)(type, id, options);
        }
    };
    const { beginMarker, endMarker } = options;
    if (beginMarker || endMarker) {
        (0, unist_util_visit_1.visit)(markdownAST, `embedVideo`, (node) => {
            const { data } = node;
            match(node, data.content);
        });
    }
    else {
        (0, unist_util_visit_1.visit)(markdownAST, `inlineCode`, (node) => {
            const { value } = node;
            match(node, value);
        });
    }
};
const setParserPlugins = (options) => {
    options = overrideDefaultOptions(options);
    const { beginMarker, endMarker } = options;
    return [
        [
            remark_burger_1.default,
            {
                beginMarker,
                endMarker,
                onlyRunWithMarker: true,
                pattyName: "embedVideo",
            },
        ],
    ];
};
addVideoIframe.setParserPlugins = setParserPlugins;
module.exports = addVideoIframe;
