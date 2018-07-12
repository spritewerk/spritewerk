export default class Camera {
  public x:number = 0;
  public y:number = 0;
  public width:number = 0;
  public height:number = 0;

  constructor(x:number, y:number, width:number, height:number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  public pan (x:number = 0, y:number = 0):void {
    this.x += x;
    this.y += y;
  }
}
