import Sprite from "./Sprite";
import { BitmapOptions } from "./types";
import { setOptions } from "./util";

export default class Bitmap extends Sprite {
  private srcX:number = 0;
  private srcY:number = 0;
  private image:HTMLImageElement = null;

  constructor (options?:BitmapOptions) {
    super(options);
    setOptions(this, options);
  }

  public getSrcX ():number {
    return this.srcX;
  }

  public setSrcX (value:number):Bitmap {
    this.srcX = value;
    return this;
  }

  public getSrcY ():number {
    return this.srcY;
  }

  public setSrcY (value:number):Bitmap {
    this.srcY = value;
    return this;
  }

  public getImage ():HTMLImageElement {
    return this.image;
  }
  
  public render (context:CanvasRenderingContext2D):void {
    super.render(context);

    console.log("Bitmap#render");

    context.drawImage(
      this.image,
      this.srcX,
      this.srcY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }

  public setImage (value:HTMLImageElement):Bitmap {
    this.image = value;
    return this;
  }
}

