import { URL } from "url";

interface IEmbedVideoOptions {
  width: number;
  ratio: number;
  related?: boolean;
  height?: number;
  noIframeBorder?: boolean;
}

interface IVideoId {
  id: string,
  service: string
}

interface IVideoService {
  id: string;
  embedUrl: (val:string) => string;
  urlProcessing?: (id: string, url: URL, options: IEmbedVideoOptions) => URL;
  additionalHTML?: string;
}

