"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.youtubeUrl = void 0;
const url_1 = require("url");
function youtubeUrl(id, url, options) {
    let newParameters = [];
    if (id.startsWith("http")) {
        const originalParams = new url_1.URL(id);
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
exports.youtubeUrl = youtubeUrl;
