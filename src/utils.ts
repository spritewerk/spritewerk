export function deepCopyArray (original:any[]):any[] {
  const copy:any[] = [];

  for (const item of original) {
    copy.push(item);
  }

  return copy;
}

export function degreesToRadians (angle) {
  return angle * Math.PI / 180;
}

export function getPositionAfterRotation (x, y, angle) {
  angle = degreesToRadians(angle);

  return {
    x: (y * Math.sin(angle)) + (x * Math.cos(angle)),
		y: (y * Math.cos(angle)) + (x * Math.sin(angle))
  }
}
