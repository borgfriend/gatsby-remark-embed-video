"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var visit = require("unist-util-visit");
var getVideoId = require('get-video-id');
var VideoServices = {
    YOUTUBE: 'youtube',
    VIMEO: 'vimeo',
    VIDEOPRESS: 'videopress'
};
var EmbedVideo = /** @class */ (function () {
    function EmbedVideo(options) {
        this.options = options;
        this.knownPlatforms = ['youtube', 'vimeo', 'videopress'];
        var defaultOptions = {
            width: 560,
            ratio: 1.7,
            related: false
        };
        this.options = __assign({}, defaultOptions, options);
        if (!this.options.height) {
            this.options.height = Math.round(this.options.width / this.options.ratio);
        }
    }
    EmbedVideo.prototype.process = function (type, id) {
        try {
            var videoId = this.idVideo(type, id);
            var url = this.createUrl(videoId.service, videoId.id);
            var iframe = this.createIframe(videoId.service, url);
            return iframe;
        }
        catch (e) {
            return "<p style=\"color: red\">Error: " + e.message + "</p>";
        }
    };
    EmbedVideo.prototype.idVideo = function (type, id) {
        var videoId = getVideoId(id);
        if (videoId === undefined) {
            if (type === 'video') {
                throw new TypeError('Id could not be processed');
            }
            else {
                return {
                    id: id,
                    service: type
                };
            }
        }
        return videoId;
    };
    EmbedVideo.prototype.createUrl = function (service, videoId) {
        var urls = {
            youtube: "https://www.youtube.com/embed/" + videoId,
            vimeo: "https://player.vimeo.com/video/" + videoId,
            videopress: "https://videopress.com/embed/" + videoId,
        };
        var url = urls[service];
        if (!url) {
            throw new TypeError('Unknown Video Service');
        }
        if (service === VideoServices.YOUTUBE && !(this.options.related)) {
            url += '?rel=0';
        }
        return url;
    };
    EmbedVideo.prototype.createIframe = function (videoPlatform, url) {
        var iframeNode = "<iframe \n              width=\"" + this.options.width + "\" \n              height=\"" + this.options.height + "\" \n              src=\"" + url + "\" \n              frameborder=\"0\" \n              allowfullscreen\n            ></iframe>";
        if (videoPlatform === VideoServices.VIDEOPRESS) {
            iframeNode += "<script src=\"https://videopress.com/videopress-iframe.js\"></script>";
        }
        return iframeNode;
    };
    return EmbedVideo;
}());
var addVideoIframe = function (_a, options) {
    var markdownAST = _a.markdownAST;
    visit(markdownAST, "inlineCode", function (node) {
        var value = node.value;
        console.log(value);
        var processValue = value.match(/([^:]*):(.*)/);
        if (processValue) {
            var type = processValue[1];
            var id = processValue[2];
            id = id.trim();
            var embedVideo = new EmbedVideo(options);
            node.type = "html";
            node.value = embedVideo.process(type, id);
        }
    });
};
module.exports = addVideoIframe;
