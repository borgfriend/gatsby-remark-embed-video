'use strict'
const visit = require(`unist-util-visit`);
const getVideoId = require('get-video-id');

module.exports = ({ markdownAST }, options = { width: 560, height: 315 }) => {
  let createIframe = (url) => {
    return `<iframe 
              width="${options.width}" 
              height="${options.height}" 
              src="${url}" 
              frameborder="0" 
              allowfullscreen
            ></iframe>`
  };
  
  let videoTypes = {
    'youtube': (id) => createIframe(`https://www.youtube.com/embed/${id}`),
    'vimeo': (id) => createIframe(`https://player.vimeo.com/video/${id}`),
    'videopress': (id) => {
      return createIframe(`https://videopress.com/embed/${id}`) + `<script src="https://videopress.com/videopress-iframe.js"></script>`
    }
  }

  visit(markdownAST, `inlineCode`, node => {
    const { value } = node

    if (value.startsWith(`video:`) || value.startsWith(`youtube:`) || value.startsWith(`vimeo:`) || value.startsWith(`videopress:`)) {
      const processValue = value.match(/([^:])*:(.*)/);
      const videoId = getVideoId(processValue[2]);

      let output;
      if (videoId) {
        output = videoTypes[videoId.service](videoId.id);
      } else {
        let service = processValue[1];
        if (service === 'video') {
          output = `<p style="color: red">Error: Video Id could not be read.</p>`
        }
        output = videoTypes[service](videoId);
      }

      node.type = `html`
      node.value = output;

    }
  })

  return markdownAST
}
