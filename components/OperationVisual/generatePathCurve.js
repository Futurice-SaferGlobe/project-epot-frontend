// @ts-check
import { getRadialPoint } from './getRadialPoint'

/**
 * @typedef {Object} NodePoint
 * @property {1 | 2} depth depth = 1 = "header", depth = 2 = "subheader"
 * @property {Number} x the raw X position of the node point.
 * @property {Number} y the raw Y position of the node point.
 * @property {String} uid the UID for the node, which will represent an header or subheader for the operation.
 */

/**
 * @param {Object} param0
 * @param {NodePoint} param0.source the source node data
 * @param {NodePoint} param0.target the target node data
 * @param {Boolean} param0.linear whether or not create a linear path, or path with bezier.
 */
export const generatePathCurve = ({ source, target, linear }) => {
  const d = {
    start: {
      x: getRadialPoint(source.x, source.y).x,
      y: getRadialPoint(source.x, source.y).y
    },
    end: {
      x: getRadialPoint(target.x, target.y).x,
      y: getRadialPoint(target.x, target.y).y
    }
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
    // let maxvariation =
    //   [source.depth, target.depth].some(d => d === 1) &&
    //   [source.depth, target.depth].some(d => d === 2)
    //     ? 1
    //     : 0.2
    let offset = source.y < 200 || target.y < 200 ? 1 : 1
    let delta = Math.abs(source.x - target.x)
    if (delta > Math.PI) {
      delta = 2 * Math.PI - delta
    }
    return (0.2 / Math.PI) * delta + offset
  }

  // TODO: If both target.y and source.y < 200 then build two curve points

  if (target.depth === 1 && source.depth === 1) {
    d.curve = {
      p1: {
        x: getRadialPoint(
          getPathAbsoluteDistance(0.7),
          getRadiusScale() * source.y
        ).x,
        y: getRadialPoint(
          getPathAbsoluteDistance(0.7),
          getRadiusScale() * source.y
        ).y
      },
      p2: {
        x: getRadialPoint(
          getPathAbsoluteDistance(0.3),
          getRadiusScale() * source.y
        ).x,
        y: getRadialPoint(
          getPathAbsoluteDistance(0.3),
          getRadiusScale() * source.y
        ).y
      }
    }
  } else {
    d.curve = {
      p1: {
        x: getRadialPoint(
          getPathAbsoluteDistance(0.5),
          getRadiusScale() * source.y
        ).x,
        y: getRadialPoint(
          getPathAbsoluteDistance(0.5),
          getRadiusScale() * source.y
        ).y
      },
      p2: {
        x: getRadialPoint(target.x, target.y).x,
        y: getRadialPoint(target.x, target.y).y
      }
    }
  }

  return d
}

export default generatePathCurve
