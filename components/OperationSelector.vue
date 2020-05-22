<template>
  <div class="operation-legend">
    <operation-selector-button @buttonClick="ye"/>
    <div
      v-if="isModalOpen"
      class="operation-modal"
    >
      <h2>Choose operation</h2>
      <ul class="operation-choices">
        <li v-for="operation in operationsWithConn" :key="operation.internalId">
          <button
            class="choice"
            :class="{'style-active-label': styleSelectedOperation(operation)}"
            @click="() => operationSelected(operation.internalId)"
          >
            {{operation.operation}}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import eventBus from '@/plugins/eventBus'
import { mapState, mapMutations } from 'vuex'

import OperationSelectorButton from './OperationSelectorButton'
export default {
  components: {
    OperationSelectorButton
  },

  props: {
    operationsWithConn: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      isModalOpen: false
    }
  },

  computed: {
    ...mapState(['selectedOperation']),
    styleSelectedOperation() {
      if (!this.selectedOperation) return operation => false
      return operation => operation.internalId === this.selectedOperation
    }
  },

  methods: {
    ...mapMutations(['changeSelectedOperation']),
    ye() {
      this.isModalOpen = !this.isModalOpen
    },
    operationSelected(internalId) {
      this.ye()
      this.changeSelectedOperation(internalId)
      eventBus.$emit('onNodeMouseIntention', { uid: null, depth: 0, links: [] })
    }
  }
}
</script>

<style lang="scss" scoped>
.operation-legend {
  position: relative;
  top: 3px;
  left: 5px;
  display: inline-flex;
  flex-direction: row;
  .overlay-button {
    margin-right: 1rem;
  }
  .operation-modal {
    position: absolute;
    top: 20px;
    right: 15px;
    background-color: epot-color('foreground', 'base', 'light');
    padding: 2rem 1rem;
    min-width: 215px;
    color: epot-color('background', 'darker');
    h2 {
      font-size: 1.1rem;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 0.8rem;
    }
    ul {
      li {
        button {
          outline: none !important;
          color: epot-color('background', 'base');
          background-color: transparent;
          padding: 0;
          margin: 0;
          font-size: 1rem;
          line-height: 1.8;
          &.style-active-label {
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
