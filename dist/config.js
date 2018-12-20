"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var videoServices = [
    {
        id: 'youtube',
        embedUrl: "https://www.youtube.com/embed/" + videoId
    },
    {
        id: 'vimeo',
        embedUrl: "https://player.vimeo.com/video/" + videoId
    },
    {
        id: 'videopress',
        embedUrl: "https://videopress.com/embed/" + videoId
    },
    {
        id: 'twitch',
        embedUrl: "https://player.twitch.tv/?autoplay=false&video=" + videoId
    },
    {
        id: 'twitchlive',
        embedUrl: "https://player.twitch.tv/?channel=" + videoId
    }
];
exports.knownPlatforms = function () {
    return videoServices.map(function (val) { return val.id; });
};
