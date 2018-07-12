import Assets from "./Assets";
import GameState from "./GameState";
import { bindMethods } from "./util";

export default class StateMachine {
  private assets:Assets;
  private cachedStates:{ [key:string]:GameState } = {};
  private callback:Function;
  private states:{ [key:string]:GameState } = {};
  
  public isLoading:boolean = false;
  public state:GameState;

  constructor (states:{ [key:string]:GameState }, assets:Assets, callback?:Function) {
    bindMethods(this, this);
    this.assets = assets;
    this.callback = callback;
    this.states = states;
  }

  private completeLoad (name:string, newState:GameState, callback?:(state:GameState) => void):void {
    this.cachedStates[name] = newState;
    this.state = newState;

    if (this.callback) {
      this.callback(newState);
    }

    if (callback) {
      callback(newState);
    }

    newState.requestStateChange = this.load;
    newState.init();

    this.isLoading = false;
  }

  private buildState (name:string, state:GameState, callback?:(state:GameState) => void):void {
    // TODO build entities etc. with JSON data

    this.completeLoad(name, state, callback);
  }

  public load (name:string, callback?:(state:GameState) => void):void {
    this.isLoading = true;

    if (this.state) {
      this.state.destroy();
    }

    if (this.cachedStates[name]) {
      this.completeLoad(name, this.cachedStates[name], callback);
    } else {
      const state = this.states[name];

      if (!state) {
        throw new Error(`State "${name}" not found`);
      }

      if (Object.keys(state.preload).length) {
        this.assets.load(state.preload, () => {
          this.buildState(name, state, callback);
        });
      } else {
        this.buildState(name, state, callback);
      }
    }
  }
}
