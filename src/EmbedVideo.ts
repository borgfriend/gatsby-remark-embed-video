import { URL } from "url";

import { getVideoService, videoIdProcessors } from "./config";
import { IEmbedVideoOptions, IVideoId, IVideoService } from "./interfaces";

export function embedVideoHTML(
  type: string,
  id: string,
  options: IEmbedVideoOptions
): string {
  try {
    const videoId: IVideoId = readVideoId(type, id);
    const videoService = getVideoService(videoId.service, options);
    const url = createUrl(videoId.id, videoService, options);
    let iframe = createIframe(url, id, videoService, options);
    return iframe;
  } catch (e) {
    return `<p style="color: red">Error: ${(e as Error).message}</p>`;
  }
}

export function readVideoId(type: string, id: string): IVideoId {
  let videoId: IVideoId | {};
  for (let processor of videoIdProcessors) {
    try {
      videoId = processor(id);
    } catch (e) {
      videoId = {};
    }

    
    if (Object.keys(videoId).length !== 0 && (videoId as IVideoId).id !== null) {
      return videoId as IVideoId;
    }
  }

  if (type === "video") {
    throw new TypeError("Id could not be processed");
  }

  return {
    id: id,
    service: type.toLowerCase(),
  };
}

function createUrl(
  videoId: string,
  videoService: IVideoService,
  options: IEmbedVideoOptions
): string {
  const videoUrl = videoService.embedUrl(videoId);
  let url = new URL(videoUrl);

  if (videoService.urlProcessing) {
    url = videoService.urlProcessing(videoId, url, options);
  }

  return url.toString();
}

function createIframe(
  url: string,
  id: string,
  videoService: IVideoService,
  options: IEmbedVideoOptions
) {
  const {
    title = "",
    width,
    height,
    containerClass,
    loadingStrategy,
  } = options;

  let iframeNode = `
        <div class="${containerClass}">
            <iframe
              title="${title}"
              width="${width}"
              height="${height}"
              src="${url}"
              class="embedVideo-iframe"
              ${options.noIframeBorder ? 'style="border:0"' : ""}
              ${options.iframeId ? `id="${id}"` : ""}
              loading="${loadingStrategy}"
              allowfullscreen
	      sandbox="allow-same-origin allow-scripts allow-popups"
            ></iframe>
        </div>`;

  if (videoService.additionalHTML) {
    iframeNode += videoService.additionalHTML;
  }

  return iframeNode;
}
