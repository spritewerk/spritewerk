import Layer from "../Layer";
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

export interface GameStateOptions {
  bgColor?:string;
  entities?:Layer[];
  preload?:{ [key:string]:string };
  props?:{ [key:string]:any };
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
  inCamera?:boolean;
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

export interface SpriteOptions {
  height?:number;
  hitOffset?:Rectangle;
  visible?:boolean;
  width?:number;
  x?:number;
  y?:number;
}

export interface ViewOptions {
  hitRectAlpha:number;
  hitRectColor:number;
}
