export const getRadialPoint = (x, y) => ({
  x: y * Math.cos((x = x - Math.PI / 2)),
  y: y * Math.sin(x)
})
