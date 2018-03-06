import { CharData } from "./types";

export default class BitmapFont {
  private map:{ [key:string]:CharData };
  private image:HTMLImageElement;
  private tallestCharHeight:number;

  constructor(map:{ [key:string]:CharData }, image:HTMLImageElement) {
    this.map = map;
    this.image = image;

    this.calcTallestCharHeight();
  }

  private calcTallestCharHeight ():void {
    let tallest:number = 0;

    for (const key in this.map) {
      const charData:CharData = this.map[key];

      if (charData.height > tallest) {
        tallest = charData.height;
      }
    }

    this.tallestCharHeight = tallest;
  }
  
  public getChar (charUnicode:number):any {
    return this.map[charUnicode];
  }

  public getImage ():HTMLImageElement {
    return this.image;
  }

  public getTallestCharHeight ():number {
    return this.tallestCharHeight;
  }
}
