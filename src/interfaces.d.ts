import { URL } from "url";
import { RemarkBurgerOptions } from "remark-burger";

interface Node {
  type: string;
  value: string;
  data: { content: string };
}

interface IEmbedVideoOptions extends RemarkBurgerOptions {
  width: number;
  ratio: number;
  related?: boolean;
  height?: number;
  noIframeBorder?: boolean;
  urlOverrides?: {
    id: string;
    embedURL: (videoId: string) => string;
  }[];
  beginMarker?: string;
  endMarker?: string;
  title?: string;
  containerClass?: string;
  iframeId?: boolean;
  loadingStrategy?: string;
}

interface IVideoId {
  id: string;
  service: string;
}

interface IVideoService {
  id: string;
  embedUrl: (val: string) => string;
  urlProcessing?: (id: string, url: URL, options: IEmbedVideoOptions) => URL;
  additionalHTML?: string;
}
