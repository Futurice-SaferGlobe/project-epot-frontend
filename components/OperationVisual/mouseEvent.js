// @ts-check
import { style } from './style'

const enhanceMouseEvent = (event, target) => {
  return {
    ...event,
    indices:
      target.dataset.typeName === 'OperationHeader' // target is top header, not sub header
        ? [parseInt(target.dataset.index), 0]
        : [
            parseInt(target.dataset.parentHeader),
            parseInt(target.dataset.index)
          ],
    uid: target.dataset.uid,
    depth: target.dataset.typeName === 'OperationHeader' ? 0 : 1,
    links: target.dataset.links.split(','),
    target
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
