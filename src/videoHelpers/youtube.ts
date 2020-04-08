import { URL } from "url";
import { IEmbedVideoOptions } from "../interfaces";

const convertTimeParameter = (time: string): string => {
  let times = time.match(/(\d+)/g);
  let result = "0"
  try {
    if (times) {
      let seconds = times
        .reverse()
        .reduce(
          (total, val, index) => total + parseInt(val,10) * Math.pow(60, index),
          0
        );
      result = seconds.toString();
    }
  } finally {
    return result;
  }
};

export function youtubeUrl(id: string, url: URL, options: IEmbedVideoOptions) {
  let newParameters: string[][] = [];
  if (id.startsWith("http")) {
    const originalParams = new URL(id);
    newParameters = [...originalParams.searchParams.entries()]
      //Skip original video Parameter
      .filter(([key, value]) => key !== "v")
      .map(([index, val]) => {
        if (index === "t") {
          const time = convertTimeParameter(val);
          return ["start", time];
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
