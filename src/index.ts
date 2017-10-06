import Sprite from "./Sprite";
import Transformer from "./Transformer";

const a = new Sprite();
const b = new Sprite();
const c = new Sprite();

a.getTransforms().rotation = 45;
b.getTransforms().rotation = 45;
b.getTransforms().x = 20;
c.getTransforms().x = 20;

b.getChildren().add(c);
a.getChildren().add(b);

Transformer.transform(a);

console.log(Transformer.getWorldTransforms(a));
console.log(Transformer.getWorldTransforms(b));
console.log(Transformer.getWorldTransforms(c));
