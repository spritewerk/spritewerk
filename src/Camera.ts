import Layer from "./Layer";

export default class Camera {
  private x:number = 0;
  private y:number = 0;
  private width:number = 0;
  private height:number = 0;

  constructor(x:number, y:number, width:number, height:number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  public getHeight ():number  {
    return this.height;
  }

  public getWidth ():number  {
    return this.width;
  }

  public getX ():number  {
    return this.x;
  }

  public getY ():number  {
    return this.y;
  }

  public setX (value:number):Camera {
    this.x = value;
    return this;
  }

  public setY (value:number):Camera {
    this.y = value;
    return this;
  }

  public translate (x:number = 0, y:number = 0):void {
    this.x += x;
    this.y += y;
  }

  public update (entities:Layer[]):void {
    for (const layer of entities) {
      if (layer.getInCamera()) {
        layer.each(item => {
          item.translate(-this.getX(), -this.getY());
        }, this);
      }
    }
  }
}
