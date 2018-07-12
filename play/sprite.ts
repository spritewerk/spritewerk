import Game from "../src/Game";
import GameState from "../src/GameState";
import Layer from "../src/Layer";
import Sprite from "../src/Sprite";
import { GameStateOptions, EventObject } from "../src/types";

class Player extends Sprite {}

class SpriteDemo extends GameState {
  constructor (opts:GameStateOptions) {
    super(opts);

    this.variables.player = new Player({
      width: 64,
      height: 64,
      flipX: true
    });
    this.bgColor = "#def";
    this.entities = [
      new Layer({}, this.variables.player)
    ]
    this.camera.pan(-16, -16);
    this.listeners.add(this.variables.player, "pressdown", this.handlePlayerPressdown);
  }

  handlePlayerPressdown (e:EventObject):void {
    console.log(e);
  }
}

new Game({
  spriteDemo: SpriteDemo
}, "spriteDemo", {
  debug: true,
  canvas: {
    width: 800,
    height: 600
  }
});
