import Assets from "../Assets";
import Camera from "../Camera";
import Layer from "../Layer";
import Listeners from "../Listeners";
import Sprite from "../Sprite";

export interface CanvasOptions {
  fitToViewport?:boolean;
  height?:number;
  selector?:string;
  width?:number;
}

export interface EventObject {
  type:ListenerTypes;
  target?:Sprite;
  x?:number;
  y?:number;
  ctrlKey?:boolean;
  shiftKey?:boolean;
  metaKey?:boolean;
  button?:number;
  keyCode?:number;
  key?:string;
}

export interface EventsOptions {
  entities:Layer[];
}

export interface GameOptions {
  debug?:boolean;
  canvas?:CanvasOptions;
}

export interface GameStateOptions {
  assets:Assets;
  camera:Camera;
  listeners:Listeners;
  bgColor?:string;
  doClear?:boolean;
  layers?:Layer[];
  preload?:{ [key:string]:string };
  variables?:{ [key:string]:any };
}

export type Handler = (e?:EventObject) => any;

export interface HandlerObject {
  target:Sprite,
  handler:Handler;
  original:Handler;
}

export interface HandlerObjects {
  pressdown:HandlerObject[];
  pressup:HandlerObject[];
  keydown:HandlerObject[];
  keyup:HandlerObject[];
}

export interface LayerOptions {
  canPan?:boolean;
  isVisible?:boolean;
  listensForPress?:boolean;
}

export type ListenerTypes = "pressdown" | "pressup" | "keydown" | "keyup";

export interface QueuedEvents {
  keydown:EventObject[];
  keyup:EventObject[];
  pressdown:EventObject[];
  pressup:EventObject[];
}

export interface Rectangle {
  height:number;
  width:number;
  x:number;
  y:number;
}

export interface RectangleOffset {
  bottom:number;
  left:number;
  right:number;
  top:number;
}

export interface SpriteOptions {
  flipX?:boolean;
  flipY?:boolean;
  height?:number;
  hitOffset?:RectangleOffset;
  visible?:boolean;
  width?:number;
  x?:number;
  y?:number;
}

export interface ViewOptions {
  hitRectAlpha?:number;
  hitRectColor?:number;
  imageSmoothingEnabled?:boolean;
}

// export interface BitmapCycleOptions {
//   positions?:Point[];
//   doRepeat?:boolean;
//   step?:number;
// }

// export interface BitmapOptions extends SpriteOptions {
//   image?:HTMLImageElement;
//   srcHeight?:number;
//   srcWidth?:number;
//   srcX?:number;
//   srcY?:number;
// }

// export interface BitmapTextOptions extends SpriteOptions {
//   value?:string;
//   size?:number;
//   maxWidth?:number;
//   lineHeight?:number;
//   font?:BitmapFont;
// }

// export interface CanvasOptions {
//   fitToViewport?:boolean;
//   height?:number;
//   selector?:string;
//   width?:number;
// }

// export interface CharData {
//   id:number;
//   x:number;
//   y:number;
//   width:number;
//   height:number;
//   xoffset:number;
//   yoffset:number;
//   xadvance:number;
//   page:number;
//   chnl:number;
// }

// export interface GameStateOptions {
//   bgColor?:string;
//   entities?:Layer[];
//   preload?:{ [key:string]:string };
//   props?:{ [key:string]:any };
// }

// export interface LayerOptions {
//   canPan?:boolean;
//   isVisible?:boolean;
//   listensForPress?:boolean;
// }

// export interface Point {
//   x:number;
//   y:number;
// }

// export interface Rectangle {
//   height:number;
//   width:number;
//   x:number;
//   y:number;
// }

// export interface RectangleOffset {
//   bottom:number;
//   left:number;
//   right:number;
//   top:number;
// }

// export interface SpriteOptions {
//   height?:number;
//   hitOffset?:RectangleOffset;
//   visible?:boolean;
//   width?:number;
//   x?:number;
//   y?:number;
// }

// export interface ViewOptions {
//   imageSmoothingEnabled?:boolean;
//   hitRectAlpha:number;
//   hitRectColor:number;
// }
