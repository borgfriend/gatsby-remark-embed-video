"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readTitle = void 0;
const readTitle = (txt) => {
    const match = txt.match(/\[(.*)\]\((.*)\)/);
    if (match) {
        return {
            id: match[2],
            title: match[1]
        };
    }
    return {
        id: txt,
        title: "",
    };
};
exports.readTitle = readTitle;
