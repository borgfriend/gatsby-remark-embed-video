"use strict";
const EmbedVideo_1 = require("./EmbedVideo");
const config_1 = require("./config");
const visit = require(`unist-util-visit`);
const overrideDefaultOptions = (options) => {
    const videoOptions = Object.assign({}, config_1.defaultOptions, options);
    if (!videoOptions.height) {
        videoOptions.height = Math.round(videoOptions.width / videoOptions.ratio);
    }
    return videoOptions;
};
const addVideoIframe = ({ markdownAST }, options) => {
    options = overrideDefaultOptions(options);
    visit(markdownAST, `inlineCode`, (node) => {
        const { value } = node;
        const keywords = [...config_1.knownPlatforms(), 'video'].join('|');
        const re = new RegExp(`\(${keywords}\):\(\.\*\)`, 'i');
        const processValue = value.match(re);
        if (processValue) {
            const type = processValue[1];
            const id = processValue[2].trim();
            node.type = `html`;
            node.value = EmbedVideo_1.embedVideoHTML(type, id, options);
        }
    });
};
module.exports = addVideoIframe;
