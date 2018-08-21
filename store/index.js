export const state = () => ({
  operationsCollection: [],
  selectedOperationIndex: 0
})

export const mutations = {
  createOperations(state, operations) {
    for (let operation of operations) {
      state.operationsCollection.push(operation)
    }
  },

  changeSelectedOperationIndex(state, operationId) {
    const opQuery = state.operationsCollection
      .map(op => op.internalId)
      .indexOf(operationId)

    if (opQuery >= 0) {
      state.selectedOperationIndex = opQuery
    }
  }
}

export const actions = {
  async fetchOperations({ commit }) {
    const dummyOperations = await this.$axios.$get(
      'http://localhost:3000/epon-dummy.json'
    )

    commit('createOperations', dummyOperations)
  }
}
