<template>
  <div class="canvas-container" ref="canvasContainer">
    <slot/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  inject: ['provider'],

  methods: {
    ...mapMutations(['changeSelectedOperationIndex']),

    createCanvas() {
      const { operationsCollection } = this.data
      this.$refs.canvasContainer.appendChild(this.provider.canvas.view)

      // Add operation entities to the canvas
      this.provider.canvas.createOperations(operationsCollection)

      // When an operation is clicked, fire this function
      this.provider.canvas.onOperationChange = e => {
        this.changeSelectedOperationIndex(e.operation.data.internalId)
      }
    }
  },

  mounted() {
    this.createCanvas()
  }
}
</script>

<style lang="scss" scoped>
.canvas-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
