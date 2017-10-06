export default class Transform {
  public x:number;
  public y:number;
  public scaleX:number;
  public scaleY:number;
  public rotation:number;

  constructor () {
    this.x = 0;
    this.y = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.rotation = 0;
  }

  sets (pairs:{}):void {
    for (const key in pairs) {
      if (this.hasOwnProperty(key)) {
        this[key] = pairs[key];
      }
    }
  }
}
