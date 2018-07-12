import Assets from "./Assets";
import Camera from "./Camera";
import Canvas from "./Canvas";
import Events from "./Events";
import GameState from "./GameState";
import Listeners from "./Listeners";
import Media from "./Media";
import StateMachine from "./StateMachine";
import Ticker from "./Ticker";
import View from "./View";
import { GameOptions } from "./types";
import { bindMethods, setOptions } from "./util";

export default class Game {
  public stateMachine:StateMachine;
  public assets:Assets = new Assets();
  public canvas:Canvas
  public debug:boolean = false;
  public events:Events;
  public media:Media;
  public ticker:Ticker;
  public view:View;

  constructor (stateClasses:{ [key:string]:typeof GameState }, initialStateName:string, options:GameOptions = {}) {
    bindMethods(this, this);
    setOptions(this, options);
    let states:{ [key:string]:GameState } = {};

    for (const key in stateClasses) {
      states[key] = new stateClasses[key]({
        assets: this.assets,
        camera: new Camera(0, 0, options.canvas.width, options.canvas.height),
        listeners: new Listeners()
      });
    }

    this.canvas = new Canvas(options.canvas);
    this.events = new Events(this.canvas.canvasEl);
    this.media = new Media(this.assets);
    this.ticker = new Ticker(this.update);
    this.view = new View(this.canvas.canvasEl, this.debug);

    this.stateMachine = new StateMachine(states, this.assets, this.handleLoad);
    this.stateMachine.load(initialStateName);
  }

  public handleLoad (state:GameState) {
    this.events.setEntities(state.entities);
  }

  private update () {
    if (!this.stateMachine.isLoading) {
      this.stateMachine.state.update(this.view, this.events);
    }
  }
}
