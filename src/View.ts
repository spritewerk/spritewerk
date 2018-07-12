import Camera from "./Camera";
import Sprite from "./Sprite";
import { ViewOptions } from "./types";
import { setOptions } from "./util";

export default class View {
  private canvas:HTMLCanvasElement;
  private context:CanvasRenderingContext2D;

  public debug:boolean = false;
  public hitRectColor:string = "red";
  public hitRectAlpha:number = 0.4;
  public imageSmoothingEnabled:boolean = false;

  constructor (canvas:HTMLCanvasElement, debug?:boolean, options?:ViewOptions) {
    setOptions(this, options);
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.context.imageSmoothingEnabled = this.imageSmoothingEnabled;
    this.debug = debug;
  }

  private debugRender (item:Sprite):void {
    const hitRect = item.getHitRect();

    this.context.fillStyle = this.hitRectColor;
    this.context.globalAlpha = this.hitRectAlpha;
    this.context.fillRect(hitRect.x, hitRect.y, hitRect.width, hitRect.height);
  }

  public clear (bgColor?:string):void {
    if (bgColor) {
      const oldFillStyle = this.context.fillStyle;

      this.context.fillStyle = bgColor;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.fillStyle = oldFillStyle;
    } else {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  public renderEntity (entity:Sprite, camera:Camera) {
    if (entity.isVisible) {
      this.context.save();
      entity.render(this.context, camera);
      if (this.debug) {
        this.debugRender(entity);
      }
      this.context.restore();
    }
  }
}
