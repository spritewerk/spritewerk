import Camera from "./Camera";
import { SpriteOptions, Rectangle, RectangleOffset } from "./types";
import { setOptions } from "./util";

export default abstract class Sprite {
  public flipX:boolean = false;
  public flipY:boolean = false;
  public height:number = 0;
  public hitOffset:RectangleOffset = {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  };
  public id:number;
  public isVisible:boolean = true;
  public opacity:number = 1;
  // public rotation:number = 0; TODO implement?
  // public scaleX:number = 1; TODO implement?
  // public scaleY:number = 1; TODO implement?
  public width:number = 0;
  public x:number = 0;
  public y:number = 0;

  private static idCounter:number = 0;

  constructor (options?:SpriteOptions) {
    setOptions(this, options);
    this.id = ++Sprite.idCounter;
  }

  public static match (a:Sprite, b:Sprite):boolean {
    return a.id === b.id;
  }

  public getHitRect ():Rectangle {
    return {
      x: this.x + this.hitOffset.left,
      y: this.y + this.hitOffset.top,
      width: this.width - this.hitOffset.right,
      height: this.height - this.hitOffset.bottom
    };
  }

  public render (context:CanvasRenderingContext2D, camera?:Camera):void {
    context.globalAlpha = this.opacity;

    context.translate(
      this.x - (camera ? camera.x : 0),
      this.y - (camera ? camera.y : 0)
    );

    if (this.flipX) {
      context.translate(this.width, 0);
      context.scale(-1, 1);
    }

    if (this.flipY) {
      context.translate(0, this.height);
      context.scale(1, -1);
    }
  }

  public translate (x:number = 0, y:number = 0):void {
    this.x += x;
    this.y += y;
  }
}
