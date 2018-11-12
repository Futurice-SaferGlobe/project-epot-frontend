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

  const getPathAbsoluteDistance = per => {
    const x1 = Math.min(target.x, source.x)
    const x2 = Math.max(target.x, source.x)
    const delta = x2 - x1

    if (delta < Math.PI) return x1 + delta * per
    else return x2 + (2 * Math.PI - delta) * per
  }

  const getRadiusScale = () => {
    let delta = Math.abs(source.x - target.x)
    if (delta > Math.PI) {
      delta = 2 * Math.PI - delta
    }
    return (0.2 / Math.PI) * delta + 1
  }

  d.curve = {
    x: getRadialPoint(
      Math.abs(getPathAbsoluteDistance(0.5)),
      getRadiusScale() * source.y
    ).x,
    y: getRadialPoint(
      Math.abs(getPathAbsoluteDistance(0.5)),
      getRadiusScale() * source.y
    ).y
  }

  return d
}

export default generatePathCurve
