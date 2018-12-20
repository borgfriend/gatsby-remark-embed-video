"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIframe = function (videoPlatform, url, _a) {
    var width = _a.width, height = _a.height, _b = _a.noIframeBorder, noIframeBorder = _b === void 0 ? true : _b;
    var iframeNode = "<iframe \n              width=\"" + width + "\" \n              height=\"" + height + "\" \n              src=\"" + url + "\"\n              class=\"embedVideoIframe\" \n              allowfullscreen\n            ></iframe>";
    if (noIframeBorder) {
        iframeNode += "\n      <style>\n        .embedVideoIframe {\n          border: 0\n        }\n      </style>";
    }
    if (videoPlatform === VideoServices.VIDEOPRESS) {
        iframeNode += "<script src=\"https://videopress.com/videopress-iframe.js\"></script>";
    }
    return iframeNode;
};
