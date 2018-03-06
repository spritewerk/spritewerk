import BitmapFont from "./BitmapFont";
import Sprite from "./Sprite";
import { BitmapTextOptions, CharData } from "./types";
import { setOptions } from "./util";

export default class BitmapText extends Sprite {
  private value:string = "";
  private size:number = 32;
  private maxWidth:number = 0;
  private lineHeight:number = 0;
  private font:BitmapFont = null;

  constructor(options?:BitmapTextOptions) {
    super(options);
    setOptions(this, options);
  }

  private getLines ():string[] {
    const words:string[] = this.value.split(" ");
    const lines:string[] = [];
    let line:string = "";

    for (let i = 0, len = words.length; i < len; i++) {
      const word:string = words[i];

      if (this.measureWords(line + word) > this.maxWidth && i > 0) {
        lines.push(line);
        line = word + " ";
      } else {
        line += (word + " ");
      }
    }

    if (line !== "") {
      lines.push(line);
    }

    return lines;
  }

  private measureWords (line:string):number {
    let wordsLength:number = 0;
    const chars:string[] = line.split("");

    for (const char of chars) {
      const charData:CharData = this.font.getChar(char.charCodeAt(0));
      wordsLength += charData.width * (this.size / this.font.getTallestCharHeight());
    }

    return wordsLength;
  }

  private renderLine (line:string, lineY:number, context:CanvasRenderingContext2D):void {
    const chars:string[] = line.split("");
    const destY:number = this.y;
    let destX:number = this.x;

    for (const char of chars) {
      const charData:CharData = this.font.getChar(char.charCodeAt(0));
      if (!charData) {
        throw new Error(`Character "${char}" not found`);
      }
      const fontSizeOffset:number = this.size / this.font.getTallestCharHeight();
      const destWidth:number = charData.width * fontSizeOffset;
      const destHeight:number = this.size * (charData.height / this.font.getTallestCharHeight());

      context.drawImage(
        this.font.getImage(),
        charData.x,
        charData.y,
        charData.width,
        charData.height,
        destX + charData.xoffset * fontSizeOffset,
        destY + charData.yoffset * fontSizeOffset + lineY,
        destWidth,
        destHeight
      );

      destX += destWidth + charData.xoffset * fontSizeOffset;
    }
  }

  public render (context:CanvasRenderingContext2D):void {
    super.render(context);

    if (this.maxWidth > 0) {
      const lines:string[] = this.getLines();

      for (let i = 0, len = lines.length; i < len; i++) {
        const line:string = lines[i];
        this.renderLine(line, i * (this.size + this.lineHeight), context);
      }
    } else {
      this.renderLine(this.value, 0, context);
    }
  }
}
