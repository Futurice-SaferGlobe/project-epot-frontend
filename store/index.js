// @ts-check
import { MutationTree, ActionTree, Mutation, GetterTree } from 'vuex'

/**
 * @typedef {Object.<string, any>} State
 */

/** @type State */
export const state = () => ({
  operationsCollection: [],
  selectedOperationIndex: 0
})

/** @type GetterTree */
export const getters = {
  activeOperationData: state => {
    return state.operationsCollection[state.selectedOperationIndex]
  }
}

/** @type MutationTree */
export const mutations = {
  /**
   * @type Mutation<State>
   * @param {State} state
   * @param {Array} operations
   */
  createOperations(state, operations) {
    for (let operation of operations) {
      state.operationsCollection.push(operation)
    }
  },

  /**
   * @type Mutation<State>
   * @param {State} state
   * @param {string} operationId
   */
  changeSelectedOperationIndex(state, operationId) {
    const opQuery = state.operationsCollection
      .map(op => op.internalId)
      .indexOf(operationId)

    if (opQuery >= 0) {
      state.selectedOperationIndex = opQuery
    }
  }
}

/** @type ActionTree */
export const actions = {
  async fetchOperations({ commit }) {
    // @ts-ignore
    const dummyOperations = await this.$axios.$get(
      'http://localhost:3000/epon-dummy.json'
    )

    commit('createOperations', dummyOperations)
  }
}
