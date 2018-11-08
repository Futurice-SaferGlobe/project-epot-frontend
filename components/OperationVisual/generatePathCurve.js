import { getRadialPoint } from './getRadialPoint'

export const generatePathCurve = ({ source, target, linear }) => {
  const { x: startX, y: startY } = getRadialPoint(source.x, source.y)
  const { x: endX, y: endY } = getRadialPoint(target.x, target.y)

  const d = {
    start: {
      x: startX,
      y: startY
    },
    end: {
      x: endX,
      y: endY
    }
  }

  if (linear) {
    return `M${d.start.x} ${d.start.y}` + `L${d.end.x} ${d.end.y}`
  }

  const getPathAbsoluteDistance = per => source.x + (target.x - source.x) * per
  const distance = Math.abs(
    Math.max(source.x, target.x) - Math.min(source.x, target.x)
  )

  d.curve = {
    x: getRadialPoint(Math.abs(getPathAbsoluteDistance(0.5)), source.y).x,
    y: getRadialPoint(Math.abs(getPathAbsoluteDistance(0.5)), source.y).y
  }

  return d
}

export default generatePathCurve
