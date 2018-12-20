"use strict";
var EmbedVideo_1 = require("./EmbedVideo");
var config_1 = require("./config");
var visit = require("unist-util-visit");
var addVideoIframe = function (_a, options) {
    var markdownAST = _a.markdownAST;
    visit(markdownAST, "inlineCode", function (node) {
        var value = node.value;
        var keywords = config_1.knownPlatforms().concat(['video']).join('|');
        var re = new RegExp("(" + keywords + "):(.*)", 'i');
        var processValue = value.match(re);
        if (processValue) {
            var type = processValue[1];
            var id = processValue[2].trim();
            var embedVideo = new EmbedVideo_1.EmbedVideo(type, id, options);
            node.type = "html";
            node.value = embedVideo.getHTML();
        }
    });
};
module.exports = addVideoIframe;
