"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const config_1 = require("./config");
function embedVideoHTML(type, id, options) {
    try {
        const videoId = readVideoId(type, id);
        const videoService = config_1.getVideoService(videoId.service, options);
        const url = createUrl(videoId.id, videoService, options);
        let iframe = createIframe(url, videoService, options);
        return iframe;
    }
    catch (e) {
        return `<p style="color: red">Error: ${e.message}</p>`;
    }
}
exports.embedVideoHTML = embedVideoHTML;
function readVideoId(type, id) {
    let videoId;
    for (let processor of config_1.videoIdProcessors) {
        try {
            videoId = processor(id);
        }
        catch (e) {
            videoId = {};
        }
        if (Object.keys(videoId).length !== 0) {
            return videoId;
        }
    }
    if (type === 'video') {
        throw new TypeError('Id could not be processed');
    }
    return {
        id: id,
        service: type.toLowerCase()
    };
}
function createUrl(videoId, videoService, options) {
    const videoUrl = videoService.embedUrl(videoId);
    let url = new url_1.URL(videoUrl);
    if (videoService.urlProcessing) {
        url = videoService.urlProcessing(videoId, url, options);
    }
    return url.toString();
}
function createIframe(url, videoService, options) {
    let iframeNode = `
        <div class="embedVideo-container">
            <iframe
              width="${options.width}"
              height="${options.height}"
              src="${url}"
              class="embedVideo-iframe"
              ${options.noIframeBorder ? 'style="border:0"' : ''}
              allowfullscreen
            ></iframe>
        </div>`;
    if (videoService.additionalHTML) {
        iframeNode += videoService.additionalHTML;
    }
    return iframeNode;
}
