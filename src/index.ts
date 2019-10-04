import { IEmbedVideoOptions, Node } from "./interfaces";
import { defaultOptions, knownPlatforms } from "./config";
import { embedVideoHTML } from "./EmbedVideo";
import plugin from "remark-burger";

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

  const match = (node: Node, v: string): void => {
    const keywords = [...knownPlatforms(), 'video'].join('|');
    const re = new RegExp(`\(${keywords}\):\(\.\*\)`, 'i');

    const processValue = v.match(re);
    if (processValue) {
      const type = processValue[1];
      const id = processValue[2].trim();

      node.type = `html`;
      node.value = embedVideoHTML(type, id, options);
    }
  }

  const { beginMarker, endMarker } = options;
  if (beginMarker || endMarker) {
    visit(markdownAST, `embedVideo`, (node: Node) => {
      const { data } = node;
      match(node, data.content);
    })
  } else {
    visit(markdownAST, `inlineCode`, (node: Node) => {
      const { value } = node;
      match(node, value);
    })
  }
}

const setParserPlugins = (options: IEmbedVideoOptions) => {
  options = overrideDefaultOptions(options)
  const { beginMarker, endMarker } = options;
  return [[ plugin, { beginMarker, endMarker, onlyRunWithMarker: true, pattyName: 'embedVideo' } ]];
}

addVideoIframe.setParserPlugins = setParserPlugins;
export = addVideoIframe;