import Layer from "./Layer";
import { GameStateOptions } from "./types";
import { setOptions } from "./util";

export default class GameState {
  public bgColor:string = null;
  public entities:Layer[] = null;
  public preload:{ [key:string]:string } = null;
  public props:{ [key:string]:any } = {};

  constructor (options?:GameStateOptions) {
    setOptions(this, options);
  }

  public requestStateChange (stateName:string):void {
    // noop
  }

  public init ():void {
    // lifecycle method
  }

  public update (delta:number):void {
    // lifecycle method
  }

  public destroy ():void {
    // lifecycle method
  }
}
