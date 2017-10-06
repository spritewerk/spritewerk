import Collection from "./Collection";
import Transform from "./Transform";

export default class Sprite {
  private children:Collection;
  private id:number;
  private opacity:number;
  private transforms:Transform;
  private transformStack:Transform[];
  private visible:boolean;

  static idCounter:number = 0;

  constructor () {
    this.children = new Collection();
    this.id = ++Sprite.idCounter;
    this.opacity = 1;
    this.transforms = new Transform();
    this.transformStack = [];
    this.visible = true;
  }

  public getChildren ():Collection {
    return this.children;
  }

  public getId ():number {
    return this.id;
  }

	public getOpacity():number {
		return this.opacity;
	}

	public setOpacity(value:number):Sprite {
    this.opacity = value;
    return this;
	}

  public getTransforms ():Transform {
    return this.transforms;
  }

  public getTransformStack ():Transform[] {
    return this.transformStack;
  }

  public setTransformStack (value:Transform[]):Sprite {
    this.transformStack = value;
    return this;
  }

  public getVisible():boolean {
    return this.visible;
  }

  public setVisible(value:boolean):Sprite {
    this.visible = value;
    return this;
  }
}
