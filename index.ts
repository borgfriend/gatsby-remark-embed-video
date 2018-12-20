import { IEmbedVideoOptions } from "./src/interfaces";
import { defaultOptions, knownPlatforms } from "./src/config";
import { embedVideoHTML } from "./src/EmbedVideo";


const visit = require(`unist-util-visit`);

const overrideDefaultOptions = (options: IEmbedVideoOptions): IEmbedVideoOptions => {
  const  videoOptions = { ...defaultOptions, ...options };

  if (!videoOptions.height) {
    videoOptions.height = Math.round(videoOptions.width / videoOptions.ratio);
  }

  return videoOptions;
}

const addVideoIframe = ({ markdownAST }: any, options: IEmbedVideoOptions) => {
  options = overrideDefaultOptions(options);

  visit(markdownAST, `inlineCode`, (node: { type: string, value: string }) => {
    const { value } = node;
    const keywords = [...knownPlatforms(), 'video'].join('|');
    const re = new RegExp(`\(${keywords}\):\(\.\*\)`, 'i');

    const processValue = value.match(re);
    if (processValue) {
      const type = processValue[1];
      const id = processValue[2].trim();

      node.type = `html`;
      node.value = embedVideoHTML(type, id, options);
    }

  })
}

export = addVideoIframe;