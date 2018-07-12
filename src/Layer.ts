import Sprite from "./Sprite";
import { LayerOptions } from "./types";
import { setOptions } from "./util";

export default class Layer {
  public items:Sprite[];
  public canPan:boolean = true;
  public listensForPress:boolean = true;
  public isVisible:boolean = true;

  constructor (options?:LayerOptions, ...items:Sprite[]) {
    setOptions(this, options);
    this.items = [];
    this.add(...items);
  }

  public add (...items:Sprite[]):void {
    this.items.push(...items);
  }

  public addAt (index:number, item:Sprite):void {
    if (index > this.items.length) {
        this.add(item);
    } else {
        this.items.splice(index, 0, item);
    }
  }

  public each (fn:(item:Sprite, index?:number, items?:Sprite[]) => boolean|void, scope?:any):void {
    const items = this.items;
    fn = scope ? fn.bind(scope) : fn;

    for (let i:number = 0, len:number = items.length; i < len; i++) {
      let doBreak = fn(items[i], i, items);
      if (doBreak === false) {
        break;
      }
    }
  }

  public remove (removee:Sprite):boolean {
    let removed:boolean = false;

    for (let i = 0, len = this.items.length; i < len; i++) {
      let item:Sprite = this.items[i];
      if (Sprite.match(item, removee)) {
        this.items.splice(i, 1);
        removed = true;
        break;
      }
    }

    return removed;
  }

  public removeAll (index:number):void {
    this.items = [];
  }

  public removeAt (index:number):void {
    this.items.splice(index, 1);
  }
}
