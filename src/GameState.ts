import Assets from "./Assets";
import Camera from "./Camera";
import Events from "./Events";
import Layer from "./Layer";
import Listeners from "./Listeners";
import View from "./View";
import { GameStateOptions } from "./types";
import { setOptions } from "./util";

export default class GameState {
  public assets:Assets = null;
  public bgColor:string = "";
  public camera:Camera = null;
  public doClear:boolean = true;
  public entities:Layer[] = [];
  public listeners:Listeners = null;
  public preload:{ [key:string]:string } = {};
  public variables:{ [key:string]:any } = {};

  constructor (options?:GameStateOptions) {
    setOptions(this, options);
  }

  public requestStateChange (stateName:string):void {
    // noop
  }

  public init ():void {
    // lifecycle method called every time state is loaded
  }

  public update (view:View, events:Events):void {
    this.listeners.handleEvents(events);

    if (this.doClear) {
      view.clear(this.bgColor);
    }

    for (const layer of this.entities) {
      if (layer.isVisible) {
        layer.each(item => {
          view.renderEntity(item, (layer.canPan ? this.camera : null));
        }, this);
      }
    }
  }

  public destroy ():void {
    // lifecycle method called every time state is un-loaded
  }
}
