import { URL } from "url";
import { IVideoId } from "../interfaces";

const readTwitchURL = (url: URL) : IVideoId | {} => {
  const pathSplit = url.pathname.split("/");
  if (pathSplit[1] === "videos"){
    const id = `v${pathSplit[2]}`
    return {
      id,
      service: "twitch"
    }
  }
  if(pathSplit[1]){
    return {
      id: pathSplit[1],
      service: "twitchLive"
    }
  }

  return {};
}

const readTwitchEmbedURL = (url: URL): IVideoId | {} => {
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

export function twitchIdProcessor(input: string): IVideoId | {} {
  const url = new URL(input);
  if (url.origin === "https://www.twitch.tv"){
    return readTwitchURL(url);
  }
  if (url.origin === "https://player.twitch.tv") {
    return readTwitchEmbedURL(url);
  }
  return {};
}
