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

  console.table([
    {
      sourceX: source.x,
      targetX: target.x,
      distance: getPathAbsoluteDistance(0.5),
      rotation: (source.x * 180) / Math.PI - 90,
      rotation2: (target.x * 180) / Math.PI - 90
    }
  ])

  if (
    (source.x <= Math.PI / 2 || source.x >= Math.PI * 1.5) &&
    (target.x <= Math.PI / 2 || target.x >= Math.PI * 1.5)
  ) {
    d.curve = {
      x: getRadialPoint(Math.sin(getPathAbsoluteDistance(0.5)), source.y).x,
      y: getRadialPoint(Math.sin(getPathAbsoluteDistance(0.5)), source.y).y
    }
  } else {
    d.curve = {
      x: getRadialPoint(getPathAbsoluteDistance(0.5), source.y).x,
      y: getRadialPoint(getPathAbsoluteDistance(0.5), source.y).y
    }
  }

  return d
}

export default generatePathCurve
