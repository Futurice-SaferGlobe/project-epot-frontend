<template>
  <div v-if="operationsCollection.length >= 1" class="container">
    <operation-explorer class="explorer" :name="activeOperationData.operation" :area="activeOperationData.area"/>
    <canvas-container class="canvas" v-if="provider.canvas && canvasApplicationLoaded" :data="{operationsCollection}"/>
    <loading-component v-else/>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
import LoadingComponent from '@/components/LoadingComponent'
import CanvasContainer from '@/components/CanvasContainer'
import OperationExplorer from '@/components/OperationExplorer'

export default {
  data: () => ({
    canvasApplicationLoaded: false,
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
    LoadingComponent,
    CanvasContainer,
    OperationExplorer
  },

  computed: {
    ...mapState(['operationsCollection', 'selectedOperationIndex']),
    ...mapGetters(['activeOperationData'])
  },

  methods: {
    ...mapActions(['fetchOperations']),

    async initCanvas() {
      const {
        default: CanvasApplication
      } = await import(/* webpackChunkName: "main-canvas" */ '@/canvas/CanvasApplication')

      this.provider.canvas = new CanvasApplication()
    }
  },

  mounted() {
    this.fetchOperations()

    this.initCanvas().then(() => {
      this.canvasApplicationLoaded = true
    })
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
