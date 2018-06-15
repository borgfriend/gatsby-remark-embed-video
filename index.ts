import { EmbedVideo, getKnownPlatforms } from "./EmbedVideo";

const visit = require(`unist-util-visit`);

const addVideoIframe = ({ markdownAST }: any, options: EmbedVideoOptions) => {
  visit(markdownAST, `inlineCode`, (node: { type: string, value: string }) => {
    const { value } = node;
    let knownPlatforms = getKnownPlatforms();
    let keywords = [...knownPlatforms, 'video'].join('|');
    let re = new RegExp(`\(${keywords}\):\(\.\*\)`, 'i');

    const processValue = value.match(re);
    if (processValue) {
      let type = processValue[1];
      let id = processValue[2];
      id = id.trim();

      let embedVideo = new EmbedVideo(type, id, options);

      node.type = `html`;
      node.value = embedVideo.getHTML();
    }

  })
}

export = addVideoIframe;