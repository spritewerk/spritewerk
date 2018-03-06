import Assets from "./src/Assets";
import Bitmap from "./src/Bitmap";
import BitmapFont from "./src/BitmapFont";
import BitmapText from "./src/BitmapText";
import Camera from "./src/Camera";
import Canvas from "./src/Canvas";
import Layer from "./src/Layer";
import Events from "./src/Events";
import Listeners from "./src/Listeners";
import Media from "./src/Media";
import Ticker from "./src/Ticker";
import View from "./src/View";

const assets = new Assets();

assets.load({
  fontData: "./data/font.json",
  fontImage: "./images/font.png",
  music: "./sounds/music.mp3"
}, () => {
  const font = new BitmapFont(assets.getJson("fontData"), assets.getImage("fontImage"));
  const text = new BitmapText({
    font,
    maxWidth: 256,
    x: 128,
    y: 32,
    value: "There was once text which wrapped, it was so beautiful to behold that it caused people's eyeballs to melt into their skulls."
  });
  const layer = new Layer();
  const entities = [layer];
  layer.add(text);

  const canvas = new Canvas({ fitToViewport: true });
  const camera = new Camera(0, 0, canvas.getWidth(), canvas.getHeight());
  const events = new Events(canvas.getEl(), { entities });
  const listeners = new Listeners();
  const media = new Media(assets);
  const ticker = new Ticker(update);
  const view = new View(canvas.getEl());

  function update (delta:number) {
    listeners.handleEvents(events);
    camera.update(entities);
    view.clear("#ccc");
    view.renderEntities(entities, true);
  }
});
