"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideoService = exports.knownPlatforms = exports.videoIdProcessors = exports.videoServicesConfig = exports.defaultOptions = void 0;
const youtube_1 = require("./videoHelpers/youtube");
const get_video_id_1 = __importDefault(require("get-video-id"));
const twitch_1 = require("./videoHelpers/twitch");
const nicovideo_1 = require("./videoHelpers/nicovideo");
exports.defaultOptions = {
    width: 560,
    ratio: 1.77,
    related: false,
    noIframeBorder: true,
    urlOverrides: [],
    containerClass: "embedVideo-container",
    loadingStrategy: "eager"
};
exports.videoServicesConfig = [
    {
        id: "youtube",
        embedUrl: (videoId) => `https://www.youtube.com/embed/${videoId}`,
        urlProcessing: youtube_1.youtubeUrl,
    },
    {
        id: "vimeo",
        embedUrl: (videoId) => `https://player.vimeo.com/video/${videoId}`,
    },
    {
        id: "videopress",
        embedUrl: (videoId) => `https://videopress.com/embed/${videoId}`,
        additionalHTML: '<script src="https://videopress.com/videopress-iframe.js"></script>',
    },
    {
        id: "twitch",
        embedUrl: (videoId) => `https://player.twitch.tv/?autoplay=false&video=${videoId}`,
    },
    {
        id: "twitchlive",
        embedUrl: (videoId) => `https://player.twitch.tv/?channel=${videoId}`,
    },
    {
        id: "niconico",
        embedUrl: (videoId) => `https://embed.nicovideo.jp/watch/${videoId}`,
    },
];
exports.videoIdProcessors = [
    get_video_id_1.default,
    twitch_1.twitchIdProcessor,
    nicovideo_1.nicoVideoProcessor,
];
const knownPlatforms = () => {
    return exports.videoServicesConfig.map((val) => val.id);
};
exports.knownPlatforms = knownPlatforms;
const getVideoService = (service, options) => {
    const foundService = exports.videoServicesConfig.find((val) => val.id === service);
    if (foundService) {
        if (options.urlOverrides) {
            const serviceOverride = options.urlOverrides.find((val) => val.id === service);
            if (serviceOverride) {
                foundService.embedUrl = serviceOverride.embedURL;
            }
        }
        return foundService;
    }
    else {
        throw Error("VideoService could not be found");
    }
};
exports.getVideoService = getVideoService;
