"use strict";
/// <reference path="EmbedVideo.d.ts" />
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = require("url");
var getVideoId = require('get-video-id');
var VideoServices = {
    YOUTUBE: 'youtube',
    VIMEO: 'vimeo',
    VIDEOPRESS: 'videopress',
    TWITCH: 'twitch',
    TWITCHLIVE: 'twitchlive',
    NICONICO: 'niconico'
};
exports.getKnownPlatforms = function () {
    return Object.keys(VideoServices).map(function (val) { return VideoServices[val]; });
};
var EmbedVideo = /** @class */ (function () {
    function EmbedVideo(type, id, options) {
        this.type = type;
        this.id = id;
        this.knownPlatforms = exports.getKnownPlatforms();
        var defaultOptions = {
            width: 560,
            ratio: 1.77,
            related: false,
            noIframeBorder: true
        };
        this.options = __assign({}, defaultOptions, options);
        if (!this.options.height) {
            this.options.height = Math.round(this.options.width / this.options.ratio);
        }
    }
    EmbedVideo.prototype.getHTML = function () {
        try {
            var videoId = this.readVideoId();
            var url = this.createUrl(videoId.service, videoId.id);
            var iframe = this.createIframe(videoId.service, url);
            return iframe;
        }
        catch (e) {
            return "<p style=\"color: red\">Error: " + e.message + "</p>";
        }
    };
    EmbedVideo.prototype.getTwitchId = function (input) {
        var url;
        try {
            url = new url_1.URL(input);
            if (url.origin == 'https://player.twitch.tv') {
                var videoParam = url.searchParams.get('video');
                if (videoParam !== null) {
                    return {
                        id: videoParam,
                        service: VideoServices.TWITCH
                    };
                }
                var channelParam = url.searchParams.get('channel');
                if (channelParam !== null) {
                    return {
                        id: channelParam,
                        service: VideoServices.TWITCHLIVE
                    };
                }
            }
            if (url.origin == 'https://www.twitch.tv') {
                var pathSplit = url.pathname.split('/');
                if (pathSplit.length >= 2) {
                    if (pathSplit[1] === 'videos') {
                        if (pathSplit.length > 2) {
                            return {
                                id: "v" + pathSplit[2],
                                service: VideoServices.TWITCH
                            };
                        }
                    }
                    else {
                        return {
                            id: pathSplit[1],
                            service: VideoServices.TWITCHLIVE
                        };
                    }
                }
            }
        }
        catch (e) {
            return {};
        }
        return {};
    };
    EmbedVideo.prototype.readVideoId = function () {
        var videoId = getVideoId(this.id);
        if (videoId.id === undefined) {
            videoId = this.getTwitchId(this.id);
        }
        if (videoId.id === undefined) {
            if (this.type === 'video') {
                throw new TypeError('Id could not be processed');
            }
            else {
                return {
                    id: this.id,
                    service: this.type.toLowerCase()
                };
            }
        }
        return videoId;
    };
    EmbedVideo.prototype.createUrl = function (service, videoId) {
        if (service === VideoServices.TWITCH && !videoId.startsWith('v')) {
            videoId = "v" + videoId;
        }
        var urls = {
            youtube: "https://www.youtube.com/embed/" + videoId,
            vimeo: "https://player.vimeo.com/video/" + videoId,
            videopress: "https://videopress.com/embed/" + videoId,
            twitch: "https://player.twitch.tv/?autoplay=false&video=" + videoId,
            twitchlive: "https://player.twitch.tv/?channel=" + videoId,
            niconico: "https://embed.nicovideo.jp/watch/" + videoId
        };
        var url = new url_1.URL(urls[service]);
        if (!url) {
            throw new TypeError('Unknown Video Service');
        }
        if (service === VideoServices.YOUTUBE) {
            if (this.id.startsWith("http")) {
                var originalParams = new url_1.URL(this.id);
                originalParams.searchParams.forEach(function (val, index) {
                    if (index === "v") {
                        //Skip original video Parameter
                    }
                    else {
                        if (index === "t") {
                            var times = val.match(/(\d+)/g);
                            if (times) {
                                var seconds = times.reverse()
                                    .reduce(function (total, val, index) { return total + (parseInt(val) * Math.pow(60, index)); }, 0);
                                url.searchParams.set("start", seconds.toString());
                            }
                        }
                        else {
                            url.searchParams.set(index, val);
                        }
                    }
                });
            }
            if (!this.options.related) {
                url.searchParams.set("rel", "0");
            }
        }
        return url.toString();
    };
    EmbedVideo.prototype.createIframe = function (videoPlatform, url) {
        var iframeNode = "<iframe \n              width=\"" + this.options.width + "\" \n              height=\"" + this.options.height + "\" \n              src=\"" + url + "\"\n              class=\"embedVideoIframe\" \n              allowfullscreen\n            ></iframe>";
        if (this.options.noIframeBorder) {
            iframeNode += "\n      <style>\n        .embedVideoIframe {\n          border: 0\n        }\n      </style>";
        }
        if (videoPlatform === VideoServices.VIDEOPRESS) {
            iframeNode += "<script src=\"https://videopress.com/videopress-iframe.js\"></script>";
        }
        return iframeNode;
    };
    return EmbedVideo;
}());
exports.EmbedVideo = EmbedVideo;
