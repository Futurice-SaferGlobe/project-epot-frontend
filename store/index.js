// @ts-check
import { MutationTree, ActionTree, GetterTree } from 'vuex'
import { layoutEnum } from '@/constants'

/**
 * @typedef {Object.<string, any>} State
 */

/** @type State */
export const state = () => ({
  pageMap: [
    { name: 'index', active: false, background: 'dark', hasVisited: false },
    { name: 'about', active: false, background: 'light', hasVisited: false }
  ],
  routerPushDirectionState: null,
  availableOperations: ['fututest'],
  selectedOperations: ['fututest'],
  labels: [
    { id: 1, title: 'Recently Changed' },
    { id: 2, title: 'Constantly Changing' },
    { id: 3, title: 'Key Learning' },
    { id: 4, title: 'Key Success' }
  ],
  activeLabel: null,
  activeHeader: { depth: 1, uid: 'PROSTA_SUB_RULLAW' },
  operationTitles: null,
  layout: layoutEnum.COMPARISON
})

/** @type GetterTree */
export const getters = {
  availableOperations: state => state.availableOperations,
  selectedOperations: state => state.selectedOperations,
  layout: state => state.layout,
  isLayoutComparison: state => state.layout === layoutEnum.COMPARISON,
  isLayoutSingle: state => state.layout === layoutEnum.SINGLE,
  activeHeader: state => state.activeHeader
}

/** @type MutationTree */
export const mutations = {
  changeActivePage(state, pageName) {
    state.pageMap = state.pageMap.map(page => ({
      ...page,
      hasVisited: page.active || page.hasVisited ? true : false,
      active: page.name === pageName ? true : false
    }))
  },

  changeActiveLabel(state, id) {
    state.activeLabel = state.labels.find(label => label.id === id)
  },

  changeRouterPushDirectionState(state, dir) {
    state.routerPushDirectionState = dir
  },

  changeOperationTitles(state, titles) {
    state.operationTitles = titles
  },

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

  changeActiveHeader(state, activeHeaderObject) {
    state.activeHeader = activeHeaderObject
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
