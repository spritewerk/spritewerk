import Sprite from "./Sprite";
import Transform from "./Transform";
import { deepCopyArray, getPositionAfterRotation } from "./utils";

export default class Transformer {
  static transformStack:Transform[];

  static transform (trunk:Sprite):void {
    Transformer.transformStack = [];
  
    Transformer.transformOne(trunk);
  }

  static transformOne (item:Sprite):void {
    item.setTransformStack(deepCopyArray(Transformer.transformStack));
    Transformer.transformStack.push(item.getTransforms());
  
    item.getChildren().each((child:Sprite, index:number) => {
      Transformer.transformOne(child);
    });
  
    Transformer.transformStack.pop();
  }

  static applyTransforms (worldTransforms, currentTransform, previousTransformInStack) {
    if (previousTransformInStack || worldTransforms.rotation !== 0) {
      const positionAfterRotation = getPositionAfterRotation(currentTransform.x, currentTransform.y, worldTransforms.rotation);
      worldTransforms.x += positionAfterRotation.x;
      worldTransforms.y += positionAfterRotation.y;
    } else {
      worldTransforms.x += currentTransform.x;
      worldTransforms.y += currentTransform.y;
    }

    worldTransforms.rotation += currentTransform.rotation;

    worldTransforms.scaleX *= currentTransform.scaleX;
    worldTransforms.scaleY *= currentTransform.scaleY;

    return worldTransforms;
  }

  static getWorldTransforms (item:Sprite) {
    let worldTransforms = new Transform();
    const transformStack = item.getTransformStack();

    for (let i = 0, len = transformStack.length; i < len; i++) {
      const currentTransform = transformStack[i];

      worldTransforms = this.applyTransforms(
        worldTransforms,
        currentTransform,
        (i > 0 && transformStack[i - 1].rotation !== 0) ? transformStack[i - 1] : null
      );
    }

    worldTransforms = this.applyTransforms(
      worldTransforms,
      item.getTransforms(),
      (transformStack[transformStack.length - 1] && transformStack[transformStack.length - 1].rotation !== 0) ? transformStack[transformStack.length - 1] : null
    );

    return worldTransforms;
  }
}
