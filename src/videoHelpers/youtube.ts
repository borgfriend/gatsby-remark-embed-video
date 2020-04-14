import { URL } from "url";
import { IEmbedVideoOptions } from "../interfaces";

export function youtubeUrl(id: string, url: URL, options: IEmbedVideoOptions) {
  let newParameters: string[][] = [];
  if (id.startsWith("http")) {
    const originalParams = new URL(id);
    newParameters = [...originalParams.searchParams.entries()]
      //Skip original video Parameter
      .filter(([key, value]) => key !== "v")
      .map(([index, val]) => {
        if (index === "t") {
          // embed urls use the start keyword instead of 't' 
          // More in
          // https://developers.google.com/youtube/player_parameters
          return ["start", val];
        }
        return [index, val];
      });
  }

  if (!options.related) {
    newParameters.push(["rel", "0"]);
  }

  newParameters.forEach((val) => {
    url.searchParams.set(val[0], val[1]);
  });
  return url;
}
