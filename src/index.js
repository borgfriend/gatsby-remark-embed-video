'use strict'
const visit = require(`unist-util-visit`);
const getVideoId = require('get-video-id');

module.exports = ({ markdownAST }, options = { width: 560, height: 315 }) => {

  const createIframe = (url) => {
    return `<iframe 
              width="${options.width}" 
              height="${options.height}" 
              src="${url}" 
              frameborder="0" 
              allowfullscreen
            ></iframe>`
  };

  const videoTypes = {
    'youtube': (id) => createIframe(`https://www.youtube.com/embed/${id}`),
    'vimeo': (id) => createIframe(`https://player.vimeo.com/video/${id}`),
    'videopress': (id) => {
      return createIframe(`https://videopress.com/embed/${id}`) + `<script src="https://videopress.com/videopress-iframe.js"></script>`
    }
  }

  visit(markdownAST, `inlineCode`, node => {
    const { value } = node;
    const processValue = value.match(/([^:]*):(.*)/);
    let type = processValue[1];
  
    if (Object.keys(videoTypes).includes(type)) {
      
      let videoId = getVideoId(processValue[2]);

      let output;
      if (videoId) {
        output = videoTypes[videoId.service](videoId.id);
      } else {
       
        if (type === 'video') {
          output = `<p style="color: red">Error: Video Id could not be read.</p>`
        } else {
          videoId = processValue[2].trim();
          output = videoTypes[type](videoId);
        }
      }

      node.type = `html`
      node.value = output;

    }
  })

  return markdownAST
}
