import { URL } from "url";

const visit = require(`unist-util-visit`);
const getVideoId = require('get-video-id');

interface EmbedVideoOptions {
  width: number;
  ratio: number;
  related: boolean;
  height?: number;
  noIframeBorder?: boolean;
}

const VideoServices = {
  YOUTUBE: 'youtube',
  VIMEO: 'vimeo',
  VIDEOPRESS: 'videopress'
}

class EmbedVideo {
  knownPlatforms = ['youtube', 'vimeo', 'videopress'];

  constructor(
    private type: string,
    private id: string,
    private options: EmbedVideoOptions
  ) {
    let defaultOptions = {
      width: 560,
      ratio: 1.77,
      related: false,
      noIframeBorder: true
    }
    this.options = { ...defaultOptions, ...options };

    if (!this.options.height) {
      this.options.height = Math.round(this.options.width / this.options.ratio);
    }

  }

  getHTML() {
    try {
      let videoId = this.readVideoId();
      let url = this.createUrl(videoId.service, videoId.id);
      let iframe = this.createIframe(videoId.service, url);
      return iframe;
    } catch (e) {
      return `<p style="color: red">Error: ${e.message}</p>`;
    }

  }

  private readVideoId(): { service: string, id: string } {
    let videoId = getVideoId(this.id);
    if (videoId === undefined) {
      if (this.type === 'video') {
        throw new TypeError('Id could not be processed');
      } else {
        return {
          id: this.id,
          service: this.type.toLowerCase()
        }
      }
    }
    return videoId;
  }

  private createUrl(service: string, videoId: string): string {
    const urls: { [index: string]: string } = {
      youtube: `https://www.youtube.com/embed/${videoId}`,
      vimeo: `https://player.vimeo.com/video/${videoId}`,
      videopress: `https://videopress.com/embed/${videoId}`,
    };

    const url = new URL(urls[service]);

    if (!url) {
      throw new TypeError('Unknown Video Service');
    }

    if (service === VideoServices.YOUTUBE) {
      if (this.id.startsWith("http")) {
        const originalParams = new URL(this.id);
        originalParams.searchParams.forEach(
          (val, index) => {
            if (index === "v") {
              //Skip original video Parameter
            } else {
              if (index === "t") {
                let times = val.match(/(\d+)/g);
                if (times) {
                  let seconds = times.reverse()
                    .reduce(
                      (total, val, index) => total + (parseInt(val) * Math.pow(60, index)
                      ), 0
                    )
                  url.searchParams.set("start", seconds.toString());
                }

              } else {
                url.searchParams.set(index, val);
              }
            }
          })
      }

      if (!this.options.related) {
        url.searchParams.set("rel", "0");
      }
    }

    return url.toString();
  }

  private createIframe(videoPlatform: string, url: string) {
    let iframeNode = `<iframe 
              width="${this.options.width}" 
              height="${this.options.height}" 
              src="${url}"
              class="embedVideoIframe" 
              allowfullscreen
            ></iframe>`
    if (this.options.noIframeBorder) {
      iframeNode += `
      <style>
        .embedVideoIframe {
          border: 0
        }
      </style>`
    }

    if (videoPlatform === VideoServices.VIDEOPRESS) {
      iframeNode += `<script src="https://videopress.com/videopress-iframe.js"></script>`
    }

    return iframeNode;
  }
}

const addVideoIframe = ({ markdownAST }: any, options: EmbedVideoOptions) => {
  visit(markdownAST, `inlineCode`, (node: { type: string, value: string }) => {
    const { value } = node;
    let knownPlatforms = ['youtube', 'vimeo', 'videopress'];
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

