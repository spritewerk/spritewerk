import { CanvasOptions, Rectangle } from "./types";
import { bindMethods, getFitDimensions, setOptions } from "./util";

export default class Canvas {
  private canvasEl:HTMLCanvasElement = null;
  private fitToViewport:boolean = true;
  private height:number = 600;
  private selector:string = "canvas";
  private width:number = 800;

  constructor (options?:CanvasOptions) {
    bindMethods(this, this);
    setOptions(this, options);
    this.canvasEl = document.querySelector(this.selector);
    this.canvasEl.width = this.width;
    this.canvasEl.height = this.height;
    this.canvasEl.style.position = "absolute";

    if (this.fitToViewport) {
      window.addEventListener("resize", this.handleResize, false);
      window.addEventListener("orientationchange", this.handleResize, false);
      this.handleResize();
    }
  }

  private handleResize ():void {
    const hasDocumentClientDimensions:boolean = Boolean(document.documentElement.clientWidth);
    const viewportWidth:number = hasDocumentClientDimensions ? document.documentElement.clientWidth : window.innerWidth;
    const viewportHeight:number = hasDocumentClientDimensions ? document.documentElement.clientHeight : window.innerHeight;
    const dimensions:Rectangle = getFitDimensions(this.width, this.height, viewportWidth, viewportHeight);

    this.canvasEl.style.height = `${dimensions.height}px`;
    this.canvasEl.style.left = `${dimensions.x}px`;
    this.canvasEl.style.top = `${dimensions.y}px`;
    this.canvasEl.style.width = `${dimensions.width}px`;
  }

  public getEl ():HTMLCanvasElement {
    return this.canvasEl;
  }

  public getHeight():number  {
    return this.height;
  }
  
  public getWidth():number  {
    return this.width;
  }
}
