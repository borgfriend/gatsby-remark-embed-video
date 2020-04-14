// `youtube: https://www.youtube.com/watch?v=2Xc9gXyf2G4`
// `youtube: 2Xc9gXyf2G4`

import { youtubeUrl } from "./youtube";

import { URL } from "url";
import { videoServicesConfig, defaultOptions } from "../config";

let youtubeURL: URL;

beforeEach(() => {
  const config = videoServicesConfig.find((val) => val.id === "youtube");
  youtubeURL = new URL(config!.embedUrl("jwVjsI_q9zY"));
});

it("applies the default", () => {
  const videoId = youtubeUrl(
    "https://youtu.be/jwVjsI_q9zY",
    youtubeURL,
    defaultOptions
  );
  expect(videoId.href).toEqual(
    "https://www.youtube.com/embed/jwVjsI_q9zY?rel=0"
  );
});

it("applies the timestamp", () => {
  const videoId = youtubeUrl(
    "https://youtu.be/jwVjsI_q9zjjjjjjjjjjjjjjjjjjjjuhjyY?t=51",
    youtubeURL,
    defaultOptions
  );
  expect(videoId.href).toEqual(
    "https://www.youtube.com/embed/jwVjsI_q9zY?start=51&rel=0"
  );
});

it("ignores the videoflag", () => {
  const videoId = youtubeUrl(
    "https://youtu.be/jwVjsI_q9zY?t=51&v=jwVjsI_q9zY",
    youtubeURL,
    defaultOptions
  );
  expect(videoId.href).toEqual(
    "https://www.youtube.com/embed/jwVjsI_q9zY?start=51&rel=0"
  );
});

it("applies all parameters", () => {
  const videoId = youtubeUrl(
    "https://youtu.be/jwVjsI_q9zY?test=51&asdf=test",
    youtubeURL,
    defaultOptions
  );
  expect(videoId.href).toEqual(
    "https://www.youtube.com/embed/jwVjsI_q9zY?test=51&asdf=test&rel=0"
  );
});

it("shows related videos with activated flag", () => {
  const videoId = youtubeUrl("https://youtu.be/jwVjsI_q9zY", youtubeURL, {
    ...defaultOptions,
    related: true,
  });
  expect(videoId.href).toEqual("https://www.youtube.com/embed/jwVjsI_q9zY");
});
