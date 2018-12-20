import { IVideoId } from "../interfaces";
import { URL } from "url";


export function nicoVideoProcessor(input: string): IVideoId | {}{
    try {
        const url = new URL(input);
        if (url.hostname.includes('nicovideo')){
            const pathSplit = url.pathname.split('/');
            if (pathSplit.length >= 3) {
                return {
                    id: pathSplit[2],
                    service: "niconico"
                }
            }
        } 
    } catch(e) {

    }

    return {}
}  
