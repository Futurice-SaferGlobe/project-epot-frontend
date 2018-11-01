// @ts-check
import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { layoutEnum } from '@/constants'

/**
 * @typedef {Object.<string, any>} State
 */

/** @type State */
export const state = () => ({
  availableOperations: ['unamid', 'digitalents'],
  selectedOperations: ['unamid', 'digitalents'],
  activeHeaderIndices: [3, 4],
  layout: layoutEnum.COMPARISON
})

/** @type GetterTree */
export const getters = {
  availableOperations: state => state.availableOperations,
  selectedOperations: state => state.selectedOperations,
  activeHeaderIndices: state => state.activeHeaderIndices,
  layout: state => state.layout,
  isLayoutComparison: state => state.layout === layoutEnum.COMPARISON,
  isLayoutSingle: state => state.layout === layoutEnum.SINGLE
}

/** @type MutationTree */
export const mutations = {
  changeSelectedOperations(state, operations) {
    const MAX_LEN = 2
    if (Array.isArray(operations) && operations.length <= MAX_LEN) {
      state.selectedOperations = operations
    } else {
      console.error(
        `changeSelectedOperations: payload was not an array, or is longer than ${MAX_LEN}`
      )
    }
  },

  changeActiveHeaderIndices(state, indices) {
    if (!Array.isArray(indices) && indices.length !== 2) {
      return console.error(
        'changeActiveHeaderIndices: provided indices are invalid'
      )
    }

    state.activeHeaderIndices = indices
  },

  changeLayout(state, newLayout) {
    const validLayoutNames = Object.entries(layoutEnum)
    if (validLayoutNames.includes(newLayout)) {
      state.layout = newLayout
    } else {
      throw new Error(`
        changeLayout: '${newLayout}' is invalid layout name. 
        Valid layout names: ${validLayoutNames.join(', ')}
      `)
    }
  }
}

/** @type ActionTree */
export const actions = {}
