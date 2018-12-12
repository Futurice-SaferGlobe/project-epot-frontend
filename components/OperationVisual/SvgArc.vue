<template>
  <g>
    <path
      class="arc"
      :class="{'style-connected': styleConnected}"
      :d="generatePath"
    />
  </g>
</template>

<script>
import eventBus from '@/plugins/eventBus'
import { generatePathCurve } from './generatePathCurve'

export default {
  props: {
    connectionData: {
      required: true
    }
  },

  data() {
    return {
      d: generatePathCurve({
        source: this.connectionData.source,
        target: this.connectionData.target
      }),

      styleConnected: false
    }
  },

  mounted() {
    const { source, target } = this.connectionData
    eventBus.$on('operationClick', ({ uid }) => {
      if ([source.uid, target.uid].includes(uid)) {
        this.styleConnected = true
      } else {
        this.styleConnected = false
      }
    })
  },

  computed: {
    generatePath() {
      return (
        `M${this.d.start.x}, ${this.d.start.y} ` + // starting x/y
        `C${this.d.curve.p1.x}, ${this.d.curve.p1.y} ` + // bezier point x/y #1
        `${this.d.end.x}, ${this.d.end.y} ` + // bezier point x/y #2
        `${this.d.end.x}, ${this.d.end.y}` // final x/y
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.arc {
  stroke: rgb(102, 153, 204);
  stroke-width: 1;
  fill: transparent;

  &.style-connected {
    stroke: epot-color('primary', 'base');
  }
}
</style>
