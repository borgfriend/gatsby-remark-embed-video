import { twitchIdProcessor } from "./twitch";

it("proceses a twitch embed url", () => {
  const exampleVideo = "https://www.twitch.tv/videos/273436948";
  expect(twitchIdProcessor(exampleVideo)).toEqual({
    id: "v273436948",
    service: "twitch",
  });
});

it("proceses a twitch video", () => {
  const exampleVideo =
    "https://player.twitch.tv/?autoplay=false&video=v273436948";
  expect(twitchIdProcessor(exampleVideo)).toEqual({
    id: "v273436948",
    service: "twitch",
  });
});

it("proceses a twitch channel URL", () => {
  const exampleChannel = "https://www.twitch.tv/dakotaz";
  expect(twitchIdProcessor(exampleChannel)).toEqual({
    id: "dakotaz",
    service: "twitchLive",
  });
});

it("proceses a twitch channel embed URL", () => {
  const exampleChannel = "https://player.twitch.tv/?channel=dakotaz";
  expect(twitchIdProcessor(exampleChannel)).toEqual({
    id: "dakotaz",
    service: "twitchLive",
  });
});

it("returns undefined for random url", () => {
  expect(twitchIdProcessor("http://youtube.com")).toEqual({});
});
