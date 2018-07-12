import Layer from "./Layer";
import Sprite from "./Sprite";
import { EventObject, EventsOptions, QueuedEvents } from "./types";
import { bindMethods, getScaleFactor, pointRectCollide, setOptions } from "./util";

class Stage extends Sprite {}

export default class Events {
  private canvasEl:HTMLCanvasElement = null;
  private entities:Layer[] = null;
  private queuedEvents:QueuedEvents;
  private stage:Stage;

  constructor (canvasEl:HTMLCanvasElement, options?:EventsOptions) {
    bindMethods(this, this);
    setOptions(this, options);
    this.flushQueuedEvents();
    this.canvasEl = canvasEl;
    this.stage = new Stage({
      x: 0,
      y: 0,
      width: this.canvasEl.width,
      height: this.canvasEl.height
    });

    this.canvasEl.addEventListener("contextmenu", this.handleEvent, false);
    this.canvasEl.addEventListener("mousedown", this.handleMouse, false);
    this.canvasEl.addEventListener("mouseup", this.handleEvent, false);
    this.canvasEl.addEventListener("touchstart", this.handleEvent, false);
    this.canvasEl.addEventListener("touchend", this.handleEvent, false);
    document.addEventListener("keydown", this.handleEvent, false);
    document.addEventListener("keyup", this.handleEvent, false);
  }

  private getTopMostTarget (event:EventObject):Sprite {
    let target:Sprite;

    for (const layer of this.entities) {
      if (layer.listensForPress) {
        layer.each(item => {
          if (pointRectCollide(event.x, event.y, item.getHitRect())) {
            target = item; // don't break, we want the last (top-most) item
          }
        });
      }
    }

    return target || this.stage;
  }

  private handleEvent (e:KeyboardEvent|MouseEvent|TouchEvent):void {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    switch (e.type) {
      case "keyup":
      case "keydown":
        this.handleKeyboard(<KeyboardEvent>e);
        break;
      case "mousedown":
      case "mouseup":
        this.handleMouse(<MouseEvent>e);
        break;
      case "touchstart":
      case "touchend":
        this.handleTouch(<TouchEvent>e);
        break;
      case "contextmenu":
        this.handleContext();
        break;
    }
  }

  private handleContext ():boolean {
    return false;
  }

  private handleKeyboard (e:KeyboardEvent):void {
    const event:EventObject = {
      type: e.type === "keyup" ? "keyup" : "keydown",
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      metaKey: e.metaKey,
      key: e.key,
      keyCode: e.keyCode
    };

    this.queuedEvents[event.type].push(event);
  }

  private handleMouse (e:MouseEvent):void {
    const boundingRect:ClientRect = this.canvasEl.getBoundingClientRect();
    const scaleFactor:number = getScaleFactor(this.canvasEl);
    const event:EventObject = {
      type: e.type === "mousedown" ? "pressdown" : "pressup",
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      metaKey: e.metaKey,
      button: e.button
    };

    event.x = Math.ceil((e.pageX - (boundingRect.left + window.scrollX)) * scaleFactor);
    event.y = Math.ceil((e.pageY - (boundingRect.top + window.scrollY)) * scaleFactor);
    event.target = this.getTopMostTarget(event);
    this.queuedEvents[event.type].push(event);
  }

  private handleTouch (e:TouchEvent):void {
    const boundingRect:ClientRect = this.canvasEl.getBoundingClientRect();
    const scaleFactor:number = getScaleFactor(this.canvasEl);
    const event:EventObject = {
      type: e.type === "touchstart" ? "pressdown" : "pressup"
    };
    let x, y;

    if (e.touches && e.touches.length) {
      x = e.touches[0].pageX;
      y = e.touches[0].pageY;
    } else if (e.changedTouches && e.changedTouches.length) {
      x = e.changedTouches[0].pageX;
      y = e.changedTouches[0].pageY;
    }

    event.x = Math.ceil((x - (boundingRect.left + window.scrollX)) * scaleFactor);
    event.y = Math.ceil((y - (boundingRect.top + window.scrollY)) * scaleFactor);
    event.target = this.getTopMostTarget(event);
    this.queuedEvents[event.type].push(event);
  }

  public flushQueuedEvents ():void {
    this.queuedEvents = {
      keydown: [],
      keyup: [],
      pressdown: [],
      pressup: []
    };
  }

  public getQueuedEvents ():QueuedEvents {
    return this.queuedEvents;
  }

  public setEntities (entities:Layer[]):void {
    this.entities = entities;
  }
}
