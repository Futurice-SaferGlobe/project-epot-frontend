// @ts-check
import { style } from './style'

const enhanceTargetClickEvent = (event, { dataset }) => {
  return {
    ...event,
    indices:
      dataset.typeName === 'OperationHeader' // target is top header, not sub header
        ? [parseInt(dataset.index), 1]
        : [parseInt(dataset.parentHeader), parseInt(dataset.index)],
    uid: dataset.uid
  }
}

/**
 *
 * @param {HTMLElement} target
 * @param {*} param1
 */
export function addMouseEvents(target, { onMouseClick }) {
  const { style } = target

  target.addEventListener('mouseover', e => {
    style.transform = 'scale(1.1)'
  })

  target.addEventListener('mouseout', e => {
    style.transform = 'scale(1)'
  })

  target.addEventListener('click', e => {
    if (typeof onMouseClick === 'function') {
      return onMouseClick(enhanceTargetClickEvent(e, target))
    }

    console.error('`onMouseClick` is not a function')
  })
}
