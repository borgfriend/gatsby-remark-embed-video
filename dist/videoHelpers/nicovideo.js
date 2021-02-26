"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nicoVideoProcessor = void 0;
const url_1 = require("url");
function nicoVideoProcessor(input) {
    try {
        const url = new url_1.URL(input);
        if (url.hostname.includes("nicovideo")) {
            const pathSplit = url.pathname.split("/");
            if (pathSplit.length >= 3) {
                return {
                    id: pathSplit[2],
                    service: "niconico",
                };
            }
        }
    }
    catch (e) { }
    return {};
}
exports.nicoVideoProcessor = nicoVideoProcessor;
