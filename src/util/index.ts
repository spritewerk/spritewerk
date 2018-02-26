import { Rectangle } from "../types";

export function bindMethods (object:any, context:any):void {
  for (const key in object.__proto__) {
    object.__proto__[key] = object.__proto__[key].bind(context);
  }
}

export function getFitDimensions (elWidth:number, elHeight:number, winWidth:number, winHeight:number):Rectangle {
  const LANDSCAPE_RATIO:number = elHeight / elWidth;
  const PORTRAIT_RATIO:number = elWidth / elHeight;
  const IS_LANDSCAPE:boolean = LANDSCAPE_RATIO < PORTRAIT_RATIO ? true : false;
  let offsetLeft:number = 0;
  let offsetTop:number = 0;
  let offsetWidth:number;
  let offsetHeight:number;

  if (IS_LANDSCAPE) {
    if (LANDSCAPE_RATIO < winHeight / winWidth) {
      offsetWidth = winWidth;
      offsetHeight = offsetWidth * LANDSCAPE_RATIO;
      offsetTop = (winHeight - offsetHeight) / 2;
    } else {
      offsetHeight = winHeight;
      offsetWidth = winHeight * PORTRAIT_RATIO;
      offsetLeft = (winWidth - offsetWidth) / 2;
    }
  } else {
    if (PORTRAIT_RATIO < winWidth / winHeight) {
      offsetHeight = winHeight;
      offsetWidth = winHeight * PORTRAIT_RATIO;
      offsetLeft = (winWidth - offsetWidth) / 2;
    } else {
      offsetWidth = winWidth;
      offsetHeight = offsetWidth * LANDSCAPE_RATIO;
      offsetTop = (winHeight - offsetHeight) / 2;
    }
  }

  return {
    height: offsetHeight,
    x: offsetLeft,
    y: offsetTop,
    width: offsetWidth
  };
}

export function getScaleFactor (canvas:HTMLCanvasElement):number {
  let factor:number = 1;

  // check if canvas has been scaled via CSS
  if (canvas.style.width) {
    const cssWidth:number = parseInt(canvas.style.width, 10);
    factor = canvas.width / cssWidth;
  }

  return factor;
}

export function pointRectCollide (x:number, y:number, rect:Rectangle) {
  return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
}

export function setOptions (object:any, options:any):void {
  for (const key in options) {
    if (object.hasOwnProperty(key)) {
      object[key] = options[key];
    }
  } 
}
