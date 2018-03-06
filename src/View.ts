import Layer from "./Layer";
import { ViewOptions } from "./types";
import { setOptions } from "./util";

export default class View {
  private canvas:HTMLCanvasElement;
  private context:CanvasRenderingContext2D;
  private hitRectColor:string = "red";
  private hitRectAlpha:number = 0.4;

  constructor (canvas:HTMLCanvasElement, options?:ViewOptions) {
    setOptions(this, options);
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
  }

  public clear (bgColor?:string):void {
    const canvas: HTMLCanvasElement = this.canvas;
    const context: CanvasRenderingContext2D = this.context;

    if (bgColor) {
      const oldFillStyle = context.fillStyle;
      context.fillStyle = bgColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = oldFillStyle;
    } else {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  public renderEntities (entities:Layer[], debug?:boolean) {
    for (const layer of entities) {
      if (layer.getIsVisible()) {
        layer.each(item => {
          if (item.getIsVisible()) {
            if (debug) {
              const oldFillStyle = this.context.fillStyle;
              const oldAlpha = this.context.globalAlpha;
              const hitRect = item.getHitRect();
              this.context.fillStyle = this.hitRectColor;
              this.context.globalAlpha = this.hitRectAlpha;
              this.context.fillRect(hitRect.x, hitRect.y, hitRect.width, hitRect.height);
              this.context.fillStyle = oldFillStyle;
              this.context.globalAlpha = oldAlpha;
            }
            this.context.globalAlpha = item.getOpacity();
            item.render(this.context);
          }
        });
      }
    }
  }
}
