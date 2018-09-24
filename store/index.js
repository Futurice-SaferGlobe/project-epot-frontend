// @ts-check
import { MutationTree, ActionTree, Mutation, GetterTree } from 'vuex'

/**
 * @typedef {Object.<string, any>} State
 */

/** @type State */
export const state = () => ({
  operationsCollection: [],
  selectedOperationIndex: null,
  test: null
})

/** @type GetterTree */
export const getters = {
  activeOperationData: state => {
    if (state.operationsCollection.length <= 0) {
      return null
    }

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
   * @param {string|number} operationId
   */
  changeSelectedOperationIndex(state, operationId) {
    if (typeof operationId === 'number') {
      state.selectedOperationIndex = operationId
    } else if (typeof operationId === 'string') {
      const opIndexQuery = state.operationsCollection
        .map(op => op.internalId)
        .indexOf(operationId)

      if (opIndexQuery >= 0) {
        state.selectedOperationIndex = opIndexQuery
      }
    }
  }
}

/** @type ActionTree */
export const actions = {
  async fetchOperations({ commit, state }) {
    if (state.operationsCollection.length <= 0) {
      // @ts-ignore
      const dummyOperation0 = await this.$axios.$get('/operation', {
        params: {
          operationId: 'unamid'
        }
      })
      // @ts-ignore
      const dummyOperation1 = await this.$axios.$get('/operation', {
        params: {
          operationId: 'digitalents'
        }
      })

      commit('createOperations', [dummyOperation0, dummyOperation1])
    }
  }
}
