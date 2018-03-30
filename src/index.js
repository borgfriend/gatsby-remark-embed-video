'use strict'
const visit = require(`unist-util-visit`);
const getVideoId = require('get-video-id');

module.exports = ({ markdownAST }, options = { width: 560, ratio: 1.7, related: false }) => {
  const createIframe = (url, videoPlatform) => {
    if (options.ratio === undefined) {
      options.ratio = 1.77;
    }

    let height = options.height;

    if (height === undefined) {
      height = Math.round(options.width / options.ratio);
    }

    if (videoPlatform == 'youtube' && !(options.related)) {
      url += '?rel=0';
    }

    return `<iframe 
              width="${options.width}" 
              height="${height}" 
              src="${url}" 
              frameborder="0" 
              allowfullscreen
            ></iframe>`
  };

  const videoTypes = {
    'youtube': (id) => createIframe(`https://www.youtube.com/embed/${id}`, 'youtube'),
    'vimeo': (id) => createIframe(`https://player.vimeo.com/video/${id}`, 'vimeo'),
    'videopress': (id) => {
      return createIframe(`https://videopress.com/embed/${id}`, 'videopress') + `<script src="https://videopress.com/videopress-iframe.js"></script>`;
    },
    'video': (id) => `<p style="color: red">Error: Video Id could not be read.</p>`
  }

  visit(markdownAST, `inlineCode`, node => {
    const { value } = node;

    const processValue = value.match(/([^:]*):(.*)/);
    if (processValue) {
      let type = processValue[1];
      let id = processValue[2];

      if (Object.keys(videoTypes).includes(type) && id) {
        id = id.trim();
        let videoId = getVideoId(id);
        if (videoId) {
          type = videoId.service;
          id = videoId.id;
        }
        node.type = `html`
        node.value = videoTypes[type](id);
      }
    }

  })

  return markdownAST
}
