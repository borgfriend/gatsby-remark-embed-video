'use strict';

const visit = require(`unist-util-visit`);
const getVideoId = require('get-video-id');

const createIframe = url => {
  return `<iframe 
            width="${options.width}" 
            height="${options.height}" 
            src="${url}" 
            frameborder="0" 
            allowfullscreen
          ></iframe>`;
};

const videoTypes = {
  'youtube': id => createIframe(`https://www.youtube.com/embed/${id}`),
  'vimeo': id => createIframe(`https://player.vimeo.com/video/${id}`),
  'videopress': id => {
    return createIframe(`https://videopress.com/embed/${id}`) + `<script src="https://videopress.com/videopress-iframe.js"></script>`;
  },
  'video': id => {
    let videoId = getVideoId(id);
    if (videoId) {
      return videoTypes[videoId.service](videoId.id);
    } else {
      return `<p style="color: red">Error: Video Id could not be read.</p>`;
    }
  }
};

module.exports = ({ markdownAST }, options = { width: 560, height: 315 }) => {

  visit(markdownAST, `inlineCode`, node => {
    const { value } = node;

    const processValue = value.match(/([^:]*):(.*)/);
    let type = processValue[1];
    let id = processValue[2];

    if (Object.keys(videoTypes).includes(type) && id) {
      id = id.trim();
      node.type = `html`;
      node.value = videoTypes[type](id);
    }
  });

  return markdownAST;
};