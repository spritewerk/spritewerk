import Events from "./Events";
import Sprite from "./Sprite";
import { Handler, HandlerObject, HandlerObjects, ListenerTypes, QueuedEvents } from "./types";

export default class Listeners {
  private handlerObjects:HandlerObjects;

  constructor () {
    this.handlerObjects = {
      keydown: [],
      keyup: [],
      pressdown: [],
      pressup: []
    }
  }

  public add (target:Sprite, type:ListenerTypes, handler:Handler, scope?:any):void {
    this.handlerObjects[type].push({
      handler: scope ? handler.bind(scope) : handler,
      original: handler,
      target
    });
  }

  public handleEvents (events:Events):void {
    const queuedEvents:QueuedEvents = events.getQueuedEvents();

    for (const type in queuedEvents) {
      switch (type) {
        case "keydown":
        case "keyup":
          for (const eventObject of queuedEvents[type]) {
            for (const handlerObject of this.handlerObjects[type]) {
              handlerObject.handler(eventObject);
            }
          }
          break;
        case "pressdown":
        case "pressup":
          for (const eventObject of queuedEvents[type]) {
            for (const handlerObject of this.handlerObjects[type]) {
              if (!handlerObject.target || Sprite.match(eventObject.target, handlerObject.target)) {
                handlerObject.handler(eventObject);
              }
            }
          }
          break;
      }
    }

    events.flushQueuedEvents();
  }

  public remove (target:Sprite, type:ListenerTypes, handler:Handler):void {
    const handlerObjects:HandlerObject[] = this.handlerObjects[type];

    for (let i = 0, len = handlerObjects.length; i < len; i++) {
      if (((!target && !handlerObjects[i].target) || Sprite.match(target, handlerObjects[i].target)) && handler === handlerObjects[i].original) {
        handlerObjects.splice(i, 1);
        break;
      }
    }
  }
}
