import { getObjectCount, xhrGet } from "./util";

export default class Assets {
  private static audio:{ [key:string]:HTMLAudioElement } = {};
  private static images:{ [key:string]:HTMLImageElement } = {};
  private static json:{ [key:string]:any } = {};
  private static loadedCount:number;
  private static totalCount:number;
  private static callback:Function;

  private static onAssetLoad ():void {
    this.loadedCount++;

    if (this.loadedCount === this.totalCount) {
      if (this.callback) {
        this.callback();
      }
    }
  }

  private static getType (path:string):string {
    if (path.indexOf(".mp3") > 0 || path.indexOf(".wav") > 0 || path.indexOf(".ogv") > 0) {
      return "audio";
    } else if (path.indexOf(".png") > 0 || path.indexOf(".jpg") > 0 || path.indexOf(".jpeg") > 0 || path.indexOf(".gif") > 0) {
      return "image";
    } else if (path.indexOf(".json") > 0) {
      return "json";
    }
  }

  public static load (paths:any, callback:Function):void {
    this.loadedCount = 0;
    this.totalCount = getObjectCount(paths);
    this.callback = callback;

    for (let key in paths) {
      switch (this.getType(paths[key])) {
        case "audio":
          if (!this.audio[key]) {
            const asset:HTMLAudioElement = new Audio();
            asset.oncanplaythrough = ()=> {
              this.audio[key] = asset;
              this.onAssetLoad();
            };
            asset.onerror = ()=> {
              console.log(`Could not find asset ${paths[key]}`);
            };
            asset.src = paths[key];
          } else {
            this.onAssetLoad();
          }
          break;
        case "image":
          if (!this.images[key]) {
            const asset:HTMLImageElement = new Image();
            asset.onload = ()=> {
              this.images[key] = asset;
              this.onAssetLoad();
            };
            asset.onerror = ()=> {
              console.log(`Could not find asset ${paths[key]}`);
            };
            asset.src = paths[key];
          } else {
            this.onAssetLoad();
          }
          break;
        case "json":
            if (!this.json[key]) {
              xhrGet(paths[key], data => {
                this.json[key] = JSON.parse(data);
                this.onAssetLoad();
              });
            } else {
              this.onAssetLoad();
            }
            break;
        default:
          throw new Error(`asset type "${paths[key]}" not supported`);
      }
    }
  }

  public static getAudio(key:string):HTMLAudioElement {
    return this.audio[key];
  }

  public static getImage(key:string):HTMLImageElement {
    return this.images[key];
  }

  public static getJson(key:string):any {
    return this.json[key];
  }
}
