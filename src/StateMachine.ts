import Assets from "./Assets";
import GameState from "./GameState";
import { bindMethods } from "./util";

export default class StateMachine {
  private cachedStates:{ [key:string]:GameState } = {};
  private states:{ [key:string]:GameState } = {};
  private state:GameState;
  private assets:Assets;
  private isLoading:boolean = false;
  private callback:(state:GameState) => void;

  constructor (states:{ [key:string]:GameState }, assets:Assets, callback:(state:GameState) => void) {
    bindMethods(this, this);
    this.states = states;
    this.assets = assets;
    this.callback = callback;
  }

  private completeLoad (name:string, newState:GameState, callback?:(state:GameState) => void):void {
    this.cachedStates[name] = newState;
    this.state = newState;

    this.callback(newState);

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

      if (Object.keys(state.preload).length) {
        this.assets.load(state.preload, () => {
          this.buildState(name, state, callback);
        });
      } else {
        this.buildState(name, state, callback);
      }
    }
  }

	public getState():GameState {
		return this.state;
  }

	public getIsLoading():boolean {
		return this.isLoading;
	}
}
