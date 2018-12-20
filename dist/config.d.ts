import { IVideoService, IVideoId } from "./interfaces";
export declare const defaultOptions: {
    width: number;
    ratio: number;
    related: boolean;
    noIframeBorder: boolean;
};
export declare const videoServicesConfig: IVideoService[];
export declare const videoIdProcessors: ((id: string) => IVideoId | {})[];
export declare const knownPlatforms: () => string[];
export declare const getVideoService: (service: string) => IVideoService;
