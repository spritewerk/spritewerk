import Sprite from "./Sprite";
import { LayerOptions } from "./types";
import { setOptions } from "./util";

export default class Layer {
  private items:Sprite[];
  private inCamera:boolean = true;
  private listensForPress:boolean = true;
  private isVisible:boolean = false;

  constructor (options?:LayerOptions) {
    setOptions(this, options);
    this.items = [];
  }

  public add (...items:Sprite[]):Layer {
    this.items.push(...items);
    return this;
  }

  public addAt (index:number, item:Sprite):void {
    if (index > this.getCount()) {
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

  public getAt (index:number):Sprite {
    return this.items[index];
  }

  public getCount ():number {
    return this.items.length;
  }

  public getInCamera():boolean  {
    return this.inCamera;
  }

  public getListensForPress():boolean  {
    return this.listensForPress;
  }

  public getIndex (item:Sprite, fromIndex?:number):number {
    return this.items.indexOf(item, fromIndex);
  }

  public getIsAtFront (item:Sprite):boolean {
    return this.getIndex(item) === this.getCount() - 1;
  }

  public getIsAtBack (item:Sprite):boolean {
    return this.getIndex(item) === 0;
  }

  public getIsVisible ():boolean {
    return this.isVisible;
  }

  public getItems ():Sprite[] {
    return this.items;
  }

  public move (movee:Sprite, indices:number):boolean {
    const index = this.getIndex(movee);

    if (indices === 0) {
      return false;
    }
    // cannot move before begining (don't use isAtBack to save getIndex use)
    if (index === 0 && indices < 0) {
      return false;
    }
    // cannot move past end (don't use isAtFront to save getIndex use)
    if (index === this.getCount() - 1 && indices > 0) {
      return false;
    }

    this.remove(movee);
    this.addAt(index + indices, movee);

    return true;
  }

  public moveToFront (movee:Sprite):boolean {
    if (this.getIsAtFront(movee)) {
      return false;
    }

    this.remove(movee);
    this.addAt(this.getCount(), movee);

    return true;
  }

  public moveToBack (movee:Sprite):boolean {
    if (this.getIsAtBack(movee)) {
      return false;
    }

    this.remove(movee);
    this.addAt(0, movee);

    return true;
  }

  public remove (removee:Sprite):boolean {
    let removed:boolean = false;

    for (let i = 0, len = this.getCount(); i < len; i++) {
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

  public setInCamera(value:boolean):Layer {
    this.inCamera = value;
    return this;
  }

  public setIsVisible(value:boolean):Layer {
    this.isVisible = value;
    return this;
  }

  public setListensForPress(value:boolean):Layer {
    this.listensForPress = value;
    return this;
  }

  public swap (a:Sprite, b:Sprite):void {
    const indexA = this.getIndex(a);
    const indexB = this.getIndex(b);

    if (indexB > indexA) {
      this.items.splice(indexB, 1);
      this.items.splice(indexA, 1);
    } else {
      this.items.splice(indexA, 1);
      this.items.splice(indexB, 1);
    }

    this.addAt(indexA, b);
    this.addAt(indexB, a);
  }
}
