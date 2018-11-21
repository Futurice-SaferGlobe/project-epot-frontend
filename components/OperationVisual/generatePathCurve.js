// @ts-check
import { getRadialPoint } from './getRadialPoint'

/**
 *
 * @param {Object} param0
 * @param {Object} param0.source the source node data
 * @param {Object} param0.target the target node data
 * @param {Boolean} param0.linear whether or not create a linear path, or path with bezier.
 */
export const generatePathCurve = ({ source, target, linear }) => {
  // Create the start and end points for the path
  const { x: startX, y: startY } = getRadialPoint(source.x, source.y)
  const { x: endX, y: endY } = getRadialPoint(target.x, target.y)

  const d = {
    start: { x: startX, y: startY },
    end: { x: endX, y: endY }
  }

  // If `linear` argument is true, just return start/end points
  // for the path
  if (linear) {
    return d
  }

  // ... otherwise, continue generating the bezier curves
  const getPathAbsoluteDistance = per => {
    const x1 = Math.min(target.x, source.x)
    const x2 = Math.max(target.x, source.x)
    const delta = x2 - x1

    if (delta < Math.PI) return x1 + delta * per
    else return x2 + (2 * Math.PI - delta) * per
  }

  const getRadiusScale = () => {
    let maxvariation = source.y < 200 || target.y < 200 ? 0.2 : 0.2
    let offset = source.y < 200 || target.y < 200 ? 1 : 1
    let delta = Math.abs(source.x - target.x)
    if (delta > Math.PI) {
      delta = 2 * Math.PI - delta
    }
    return (0.3 / Math.PI) * delta + offset
  }

  console.log(target, source)

  // TODO: If both target.y and source.y < 200 then build two curve points

  d.curve = {
    p1: {
      x: getRadialPoint(
        Math.abs(getPathAbsoluteDistance(0.5)),
        getRadiusScale() * source.y
      ).x,
      y: getRadialPoint(
        Math.abs(getPathAbsoluteDistance(0.5)),
        getRadiusScale() * source.y
      ).y
    }
  }

  return d
}

export default generatePathCurve
