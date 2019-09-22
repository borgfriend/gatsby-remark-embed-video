"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
function analyseTwitch(url) {
    let id = url.searchParams.get('video');
    if (id === null) {
        const pathSplit = url.pathname.split('/');
        if (pathSplit.length > 2 && pathSplit[1] === 'videos') {
            id = pathSplit[2];
        }
    }
    if (id) {
        if (!id.startsWith('v')) {
            id = `v${id}`;
        }
        return {
            id,
            service: "twitch"
        };
    }
    else {
        return undefined;
    }
}
function analyseTwitchLive(url) {
    let id = url.searchParams.get('channel');
    if (id === null) {
        const pathSplit = url.pathname.split('/');
        if (pathSplit.length >= 2) {
            id = pathSplit[1];
        }
    }
    if (id) {
        return {
            id,
            service: "twitchLive"
        };
    }
    else {
        return undefined;
    }
}
function twitchIdProcessor(input) {
    const url = new url_1.URL(input);
    const twitchUrls = ['https://player.twitch.tv', 'https://www.twitch.tv'];
    if (twitchUrls.includes(url.origin)) {
        return analyseTwitch(url) || analyseTwitchLive(url) || {};
    }
    else {
        return {};
    }
}
exports.twitchIdProcessor = twitchIdProcessor;
