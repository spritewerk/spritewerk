import { SpriteOptions, Rectangle } from "./types";
import { setOptions } from "./util";

export default class Sprite {
  private height:number = 0;
  private hitOffset:Rectangle = null;
  private id:number;
  private opacity:number = 1;
  private width:number = 0;
  private x:number = 0;
  private y:number = 0;
  private visible:boolean = true;

  private static idCounter:number = 0;

  constructor (options?:SpriteOptions) {
    setOptions(this, options);
    this.id = ++Sprite.idCounter;
    if (!this.hitOffset) {
      this.hitOffset = {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height
      };
    }
  }

  public static match (a:Sprite, b:Sprite):boolean {
    return a.getId() === b.getId();
  }

  public getHeight ():number {
    return this.height;
  }

  public getHitRect ():Rectangle {
    return {
      x: this.x + this.hitOffset.x,
      y: this.y + this.hitOffset.y,
      width: this.hitOffset.width,
      height: this.hitOffset.height
    };
  }

  public getId ():number {
    return this.id;
  }

  public getVisible ():boolean {
    return this.visible;
  }

  public getWidth ():number {
    return this.width;
  }

  public getX ():number {
    return this.x;
  }

  public getY ():number {
    return this.y;
  }

  public render (context:CanvasRenderingContext2D, debug?:boolean):void {
    if (debug) {
      const oldFillStyle = context.fillStyle;
      const oldAlpha = context.globalAlpha;
      const hitRect = this.getHitRect();
      context.fillStyle = "red";
      context.globalAlpha = 0.4;
      context.fillRect(hitRect.x, hitRect.y, hitRect.width, hitRect.height);
      context.fillStyle = oldFillStyle;
      context.globalAlpha = oldAlpha;
    }
  }

  public setHeight (value:number):Sprite {
    this.height = value;
    return this;
  }

  public setHitOffset (x:number, y:number, width:number, height:number):Sprite {
    this.hitOffset = { x, y, width, height };
    return this;
  }

  public setVisible (value:boolean):Sprite {
    this.visible = value;
    return this;
  }

  public setWidth (value:number):Sprite {
    this.width = value;
    return this;
  }

  public setX (value:number):Sprite {
    this.x = value;
    return this;
  }

  public setY (value:number):Sprite {
    this.y = value;
    return this;
  }

  public translate (x:number = 0, y:number = 0):void {
    this.x += x;
    this.y += y;
  }
}
