"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmbedVideo_1 = require("../EmbedVideo");
it("works with a shortcode", () => {
    const type = "youtube";
    const id = "2Xc9gXyf2G4";
    const videoId = (0, EmbedVideo_1.readVideoId)(type, id);
    expect(videoId.id).toBe(id);
    expect(videoId.service).toBe(type);
});
