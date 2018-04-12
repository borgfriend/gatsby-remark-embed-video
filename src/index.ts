const visit = require(`unist-util-visit`);
const getVideoId = require('get-video-id');

interface EmbedVideoOptions {
  width: number;
  ratio: number;
  related: boolean;
  height?: number;
}

const VideoServices = {
  YOUTUBE: 'youtube',
  VIMEO: 'vimeo',
  VIDEOPRESS: 'videopress'
}

class EmbedVideo {
  knownPlatforms = ['youtube', 'vimeo', 'videopress'];

  constructor(
    private options: EmbedVideoOptions
  ) {
    let defaultOptions = {
      width: 560,
      ratio: 1.7,
      related: false
    }
    this.options = { ...defaultOptions, ...options };

    if (!this.options.height) {
      this.options.height = Math.round(this.options.width / this.options.ratio);
    }
  }

  process(type: string, id: string) {
    try {
      let videoId = this.idVideo(type, id);
      let url = this.createUrl(videoId.service, videoId.id);
      let iframe = this.createIframe(videoId.service, url);
      return iframe;
    } catch (e) {
      return `<p style="color: red">Error: ${e.message}</p>`;
    }

  }

  idVideo(type: string, id: string): { service: string, id: string } {
    let videoId = getVideoId(id);
    if (videoId === undefined) {
      if (type === 'video') {
        throw new TypeError('Id could not be processed');
      } else {
        return {
          id: id,
          service: type
        }
      }
    }
    return videoId;
  }

  createUrl(service: string, videoId: string): string {
    const urls: { [index: string]: string } = {
      youtube: `https://www.youtube.com/embed/${videoId}`,
      vimeo: `https://player.vimeo.com/video/${videoId}`,
      videopress: `https://videopress.com/embed/${videoId}`,
    };

    let url: string = urls[service];

    if (!url) {
      throw new TypeError('Unknown Video Service');
    }

    if (service === VideoServices.YOUTUBE && !(this.options.related)) {
      url += '?rel=0';
    }

    return url;
  }

  createIframe(videoPlatform: string, url: string) {
    let iframeNode = `<iframe 
              width="${this.options.width}" 
              height="${this.options.height}" 
              src="${url}" 
              frameborder="0" 
              allowfullscreen
            ></iframe>`

    if (videoPlatform === VideoServices.VIDEOPRESS) {
      iframeNode += `<script src="https://videopress.com/videopress-iframe.js"></script>`
    }

    return iframeNode;
  }
}

const addVideoIframe = ({ markdownAST }: any, options: EmbedVideoOptions) => {
  visit(markdownAST, `inlineCode`, (node: { type: string, value: string }) => {
    const { value } = node;
    console.log(value);

    const processValue = value.match(/([^:]*):(.*)/);
    if (processValue) {
      let type = processValue[1];
      let id = processValue[2];
      id = id.trim();

      let embedVideo = new EmbedVideo(options);

      node.type = `html`;
      node.value = embedVideo.process(type, id);
    }

  })
}

export = addVideoIframe;

