<template>
  <g>
    <path
      :id="elementId"
      class="arc"
      :class="{'style-connected': styleConnected}"
      :d="generatePath"
      ref="arc"
    />
    <path
      class="active-arc-overlay"
      ref="activeArcOverlay"
      :class="{'style-connected': styleConnected}"
      :d="generatePath"
    />
    <slot/>
  </g>
</template>

<script>
import anime from 'animejs'
import eventBus from '@/plugins/eventBus'
import { generatePathCurve } from './generatePathCurve'

export default {
  props: {
    connectionData: {
      required: true
    },
    elementId: {
      type: Number,
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
    eventBus.$on('onNodeMouseIntention', ({ uid }) => {
      if ([source.uid, target.uid].includes(uid)) {
        this.styleConnected = true
        this.animateArc()
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
        `${this.d.curve.p2.x}, ${this.d.curve.p2.y} ` + // bezier point x/y #2
        `${this.d.end.x}, ${this.d.end.y}` // final x/y
      )
    }
  },

  methods: {
    animateArc() {
      /** @type anime.animeParams */
      const animateArcId = anime({
        targets: this.$refs.activeArcOverlay,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeOutCubic',
        duration: 1000
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.arc,
.active-arc-overlay {
  stroke-width: 1;
  fill: transparent;
}

.arc {
  stroke: epot-color('foreground', 'darker');

  &.style-connected {
    stroke: rgba(102, 153, 204, 0.5);
  }
}

.active-arc-overlay {
  &.style-connected {
    stroke: epot-color('primary', 'base');
  }
}
</style>
