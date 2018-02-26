import Layer from "./Layer";

export default class View {
  private canvas:HTMLCanvasElement;
  private context:CanvasRenderingContext2D;

  constructor (canvas:HTMLCanvasElement) {
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
          item.render(this.context, debug);
        });
      }
    }
  }
}
