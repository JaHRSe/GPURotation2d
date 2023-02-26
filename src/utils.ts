export function getRandomColor() {
  return [Math.random(), Math.random(), Math.random(), 1];
}

export function degreesToRadians(angleInDegrees: number) {
  return (angleInDegrees * Math.PI) / 180;
}
