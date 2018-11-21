// @ts-check
import { style } from './style'

const enhanceMouseEvent = (event, { dataset }) => {
  return {
    ...event,
    indices:
      dataset.typeName === 'OperationHeader' // target is top header, not sub header
        ? [parseInt(dataset.index), 1]
        : [parseInt(dataset.parentHeader), parseInt(dataset.index)],
    uid: dataset.uid,
    links: dataset.links.split(',')
  }
}

/**
 *
 * @param {HTMLElement} target
 * @param {*} param1
 */
export function addMouseEvents(
  target,
  { onMouseClick, onMouseOver, onMouseOut }
) {
  target.addEventListener('mouseover', e => {
    target.style.transform = 'scale(1.1)'

    if (typeof onMouseOver === 'function') {
      onMouseOver(enhanceMouseEvent(e, target))
    }
  })

  target.addEventListener('mouseout', e => {
    target.style.transform = 'scale(1)'

    if (typeof onMouseOut === 'function') {
      onMouseOut(enhanceMouseEvent(e, target))
    }
  })

  target.addEventListener('click', e => {
    if (typeof onMouseClick === 'function') {
      return onMouseClick(enhanceMouseEvent(e, target))
    }

    console.error('`onMouseClick` is not a function')
  })
}
