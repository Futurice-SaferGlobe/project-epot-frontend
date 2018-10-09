// @ts-check
import { MutationTree, ActionTree, GetterTree } from 'vuex'

/**
 * @typedef {Object.<string, any>} State
 */

/** @type State */
export const state = () => ({
  availableOperations: ['unamid', 'digitalents'],
  selectedOperations: ['unamid', 'digitalents']
})

/** @type GetterTree */
export const getters = {
  availableOperations: state => state.availableOperations,
  selectedOperations: state => state.selectedOperations
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
  }
}

/** @type ActionTree */
export const actions = {}
