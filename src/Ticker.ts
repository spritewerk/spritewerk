import { bindMethods } from "./util";

export default class Ticker {
  private callback:(delta?:number) => void;
  private canTick:boolean = false;
  private reqId:number = null;
  private then:number = null;

  constructor (callback:(delta?:number) => void) {
    bindMethods(this, this);
    this.callback = callback;
    this.then = Date.now();
    this.start();
  }

  public tick ():void {
    if (!this.canTick) {
      return;
    }

    const now: number = Date.now();
    const delta: number = now - this.then;

    this.callback(delta);
    this.then = now;

    this.reqId = requestAnimationFrame(this.tick);
  }

  public start ():void {
    this.canTick = true;
    this.reqId = requestAnimationFrame(this.tick);
  }

  public stop ():void {
    this.canTick = false;
    cancelAnimationFrame(this.reqId);
  }
}
