import { URL } from "url";
import { IEmbedVideoOptions } from "../interfaces";

export function youtubeUrl(id: string, url: URL, options: IEmbedVideoOptions){
    if (id.startsWith("http")) {
        const originalParams = new URL(id);
        originalParams.searchParams.forEach(
          (val, index) => {
            if (index === "v") {
              //Skip original video Parameter
            } else {
              if (index === "t") {
                let times = val.match(/(\d+)/g);
                if (times) {
                  let seconds = times.reverse()
                    .reduce(
                      (total, val, index) => total + (parseInt(val) * Math.pow(60, index)
                      ), 0
                    )
                  url.searchParams.set("start", seconds.toString());
                }
  
              } else {
                url.searchParams.set(index, val);
              }
            }
          })
      }
  
      if (!options.related) {
        url.searchParams.set("rel", "0");
      }
      return url;
}
