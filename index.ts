import Canvas from "./src/Canvas";
import Layer from "./src/Layer";
import Events from "./src/Events";
import Listeners from "./src/Listeners";
import Sprite from "./src/Sprite";
import Ticker from "./src/Ticker";
import View from "./src/View";
import Camera from "./src/Camera";

(() => {
  const spriteA = new Sprite({ width: 128, height: 128 });
  const spriteB = new Sprite({ x: 32, width: 128, height: 128 });
  const layer = new Layer();
  const entities = [layer];
  layer.add(spriteA, spriteB);

  const canvas = new Canvas({ fitToViewport: true });
  const camera = new Camera(0, 0, canvas.getWidth(), canvas.getHeight());
  const events = new Events(canvas.getEl(), { entities });
  const listeners = new Listeners();
  const ticker = new Ticker(update);
  const view = new View(canvas.getEl());

  listeners.add(spriteA, "pressdown", e => {
    console.log("sprite A!", e);
  });

  function update (delta:number) {
    listeners.handleEvents(events);
    camera.update(entities);
    view.clear("#ccc");
    view.renderEntities(entities, true);
  }
})();
