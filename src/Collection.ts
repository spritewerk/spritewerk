import Sprite from "./Sprite";

export default class Collection {
  public items:Sprite[];

  constructor () {
    this.items = [];
  }

  add (...items:Sprite[]):void {
    this.items.push(...items);
  }

  each (fn):void {
    const items = this.items;

    for (let i:number = 0, len:number = items.length; i < len; i++) {
      let doBreak = fn(items[i], i);

      if (doBreak === false) {
        break;
      }
    }
  }
}
