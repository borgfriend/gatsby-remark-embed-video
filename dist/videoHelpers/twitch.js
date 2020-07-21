"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twitchIdProcessor = void 0;
const url_1 = require("url");
const readTwitchURL = (url) => {
    const pathSplit = url.pathname.split("/");
    if (pathSplit[1] === "videos") {
        const id = `v${pathSplit[2]}`;
        return {
            id,
            service: "twitch"
        };
    }
    if (pathSplit[1]) {
        return {
            id: pathSplit[1],
            service: "twitchLive"
        };
    }
    return {};
};
const readTwitchEmbedURL = (url) => {
    const videoId = url.searchParams.get("video");
    const channelId = url.searchParams.get("channel");
    if (videoId) {
        return {
            id: videoId,
            service: "twitch",
        };
    }
    if (channelId) {
        return {
            id: channelId,
            service: "twitchLive",
        };
    }
    return {};
};
function twitchIdProcessor(input) {
    const url = new url_1.URL(input);
    if (url.origin === "https://www.twitch.tv") {
        return readTwitchURL(url);
    }
    if (url.origin === "https://player.twitch.tv") {
        return readTwitchEmbedURL(url);
    }
    return {};
}
exports.twitchIdProcessor = twitchIdProcessor;
