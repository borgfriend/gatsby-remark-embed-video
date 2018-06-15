"use strict";
var EmbedVideo_1 = require("./EmbedVideo");
var visit = require("unist-util-visit");
var addVideoIframe = function (_a, options) {
    var markdownAST = _a.markdownAST;
    visit(markdownAST, "inlineCode", function (node) {
        var value = node.value;
        var knownPlatforms = EmbedVideo_1.getKnownPlatforms();
        var keywords = knownPlatforms.concat(['video']).join('|');
        var re = new RegExp("(" + keywords + "):(.*)", 'i');
        var processValue = value.match(re);
        if (processValue) {
            var type = processValue[1];
            var id = processValue[2];
            id = id.trim();
            var embedVideo = new EmbedVideo_1.EmbedVideo(type, id, options);
            node.type = "html";
            node.value = embedVideo.getHTML();
        }
    });
};
module.exports = addVideoIframe;
