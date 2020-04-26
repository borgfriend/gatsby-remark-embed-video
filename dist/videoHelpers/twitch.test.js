"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const twitch_1 = require("./twitch");
it("proceses a twitch embed url", () => {
    const exampleVideo = "https://www.twitch.tv/videos/273436948";
    expect(twitch_1.twitchIdProcessor(exampleVideo)).toEqual({
        id: "v273436948",
        service: "twitch",
    });
});
it("proceses a twitch video", () => {
    const exampleVideo = "https://player.twitch.tv/?autoplay=false&video=v273436948";
    expect(twitch_1.twitchIdProcessor(exampleVideo)).toEqual({
        id: "v273436948",
        service: "twitch",
    });
});
it("proceses a twitch channel URL", () => {
    const exampleChannel = "https://www.twitch.tv/dakotaz";
    expect(twitch_1.twitchIdProcessor(exampleChannel)).toEqual({
        id: "dakotaz",
        service: "twitchLive",
    });
});
it("proceses a twitch channel embed URL", () => {
    const exampleChannel = "https://player.twitch.tv/?channel=dakotaz";
    expect(twitch_1.twitchIdProcessor(exampleChannel)).toEqual({
        id: "dakotaz",
        service: "twitchLive",
    });
});
it("returns undefined for random url", () => {
    expect(twitch_1.twitchIdProcessor("http://youtube.com")).toEqual({});
});
