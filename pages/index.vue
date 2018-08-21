<template>
  <section v-if="operationsCollection.length >= 1" class="container">
    <operation-explorer class="explorer" :name="activeOperationData.operation" :area="activeOperationData.area"/>
    <canvas-container class="canvas" v-if="operationsCollection.length >= 1" :data="{operationsCollection}">
    </canvas-container>
  </section>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import CanvasContainer from '@/components/CanvasContainer'
import OperationExplorer from '@/components/OperationExplorer'

export default {
  data: () => ({
    provider: {
      canvas: null
    }
  }),

  provide() {
    return {
      provider: this.provider
    }
  },

  components: {
    CanvasContainer,
    OperationExplorer
  },

  computed: {
    ...mapState(['operationsCollection', 'selectedOperationIndex']),

    activeOperationData() {
      return this.operationsCollection[this.selectedOperationIndex]
    }
  },

  methods: {
    ...mapActions(['fetchOperations']),

    async initCanvas() {
      // We'll import the CanvasApplication dynamically, in order to make the initial load much faster
      // TODO: Make the Vue part of the application independent enough from the canvas one, so the site is
      // usable as fast as possible on first page load
      const {
        default: CanvasApplication
      } = await import(/* webpackChunkName: "main-canvas" */ '@/canvas/CanvasApplication')

      this.provider.canvas = new CanvasApplication()

      this.fetchOperations()
    }
  },

  created() {
    this.initCanvas()
  }
}
</script>

<style lang="scss">
.container {
  height: 100vh;
  width: 100vw;
}

.explorer {
  position: absolute;
  width: 400px;
  bottom: 6rem;
  left: calc(50% - 400px / 2);
  z-index: 2;
}

.canvas-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}

.canvas {
  z-index: 1;
}
</style>
