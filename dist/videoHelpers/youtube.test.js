"use strict";
// `youtube: https://www.youtube.com/watch?v=2Xc9gXyf2G4`
// `youtube: 2Xc9gXyf2G4`
Object.defineProperty(exports, "__esModule", { value: true });
const youtube_1 = require("./youtube");
const url_1 = require("url");
const config_1 = require("../config");
let youtubeURL;
beforeEach(() => {
    const config = config_1.videoServicesConfig.find((val) => val.id === "youtube");
    youtubeURL = new url_1.URL(config.embedUrl("jwVjsI_q9zY"));
});
it("applies the default", () => {
    const videoId = youtube_1.youtubeUrl("https://youtu.be/jwVjsI_q9zY", youtubeURL, config_1.defaultOptions);
    expect(videoId.href).toEqual("https://www.youtube.com/embed/jwVjsI_q9zY?rel=0");
});
it("applies the timestamp", () => {
    const videoId = youtube_1.youtubeUrl("https://youtu.be/jwVjsI_q9zjjjjjjjjjjjjjjjjjjjjuhjyY?t=51", youtubeURL, config_1.defaultOptions);
    expect(videoId.href).toEqual("https://www.youtube.com/embed/jwVjsI_q9zY?start=51&rel=0");
});
it("ignores the videoflag", () => {
    const videoId = youtube_1.youtubeUrl("https://youtu.be/jwVjsI_q9zY?t=51&v=jwVjsI_q9zY", youtubeURL, config_1.defaultOptions);
    expect(videoId.href).toEqual("https://www.youtube.com/embed/jwVjsI_q9zY?start=51&rel=0");
});
it("applies all parameters", () => {
    const videoId = youtube_1.youtubeUrl("https://youtu.be/jwVjsI_q9zY?test=51&asdf=test", youtubeURL, config_1.defaultOptions);
    expect(videoId.href).toEqual("https://www.youtube.com/embed/jwVjsI_q9zY?test=51&asdf=test&rel=0");
});
it("shows related videos with activated flag", () => {
    const videoId = youtube_1.youtubeUrl("https://youtu.be/jwVjsI_q9zY", youtubeURL, Object.assign(Object.assign({}, config_1.defaultOptions), { related: true }));
    expect(videoId.href).toEqual("https://www.youtube.com/embed/jwVjsI_q9zY");
});
