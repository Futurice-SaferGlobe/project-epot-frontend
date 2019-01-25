<template>
  <g 
    v-if="nodeData.depth >= 1" 
    :class="nodeData.depth === 1 ? 'header' : 'subheader'" 
    :ref="nodeData.depth === 1 ? 'header' : 'subheader'"
    :transform="groupTranslatePosition"
    @click="onNodeMouseIntention"
    @mouseover="onNodeMouseIntention"
    @mouseleave="onNodeMouseIntention"
  >
    <a xlink:href="#" ref="pseudoAnchor" onclick="return false;">
      <circle  
        r="2" 
        stroke-width="0"
        class="circle"
        :class="{
          'style-connected': styleConnected,
          'style-active-label': styleActiveLabel,
          'hovered': hovered
        }"
      />
      <g v-if="nodeData.depth === 1" class="header-text-group">
        <foreignObject
          requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility"
          width="50"
          height="30"
          class="foreignObject-header-text node-title"
          :class="{
            'style-connected': styleConnected,
            'style-active-label': styleActiveLabel,
            
          }"
        >
          <div :class="{'hovered': hovered}">
            {{nodeData.data.title}}
          </div>
        </foreignObject>
      </g>
      <g 
        v-else-if="nodeData.depth === 2" 
        class="subheader-text-group" 
        :style="setSubheaderTextRotation"
      >
        <text  
          class="subheader-text node-title" 
          :class="{
            'style-connected': styleConnected,
            'style-active-label': styleActiveLabel,
            'hovered': hovered
          }"
          :style="setSubheaderTextAlign"
        >
          {{nodeData.data.title}}
        </text>
      </g>
    </a>
  </g>
</template>

<script>
import eventBus from '@/plugins/eventBus'
import { mapState } from 'vuex'
import * as d3 from 'd3'
import * as d3TextWrap from 'd3-textwrap'
import { getRadialPoint } from './getRadialPoint'

export default {
  props: {
    nodeData: {
      required: true
    }
  },

  data() {
    return {
      styleConnected: false,
      oldMouseState: null,
      lastClickedNode: null,
      hovered: false
    }
  },

  mounted() {
    eventBus.$on('onNodeMouseIntention', ({ type, uid, links }) => {
      if (
        (this.nodeData.data.uid === uid ||
          links.includes(this.nodeData.data.uid)) &&
        type !== 'mouseleave'
      ) {
        this.styleConnected = true
      } else {
        this.styleConnected = false
      }
    })
  },

  methods: {
    preventAnchorDefault() {},

    onNodeMouseIntention(e) {
      const { type } = e
      const payload = {
        uid: this.nodeData.data.uid,
        depth: this.nodeData.depth,
        links: this.nodeData.data.links,
        type
      }

      if (type === 'click') {
        eventBus.$emit('onNodeMouseIntention', payload)
      } else if (type === 'mouseover') {
        this.hovered = true
      } else if (type === 'mouseleave') {
        this.hovered = false
      }
    }
  },

  computed: {
    ...mapState(['activeLabel', 'activeHeader', 'hoverHeader']),
    styleActiveLabel() {
      return !!this.nodeData.data.labels.find(label => {
        if (!this.activeLabel) return null
        return label.toLowerCase() === this.activeLabel.title.toLowerCase()
      })
    },
    showConnected() {
      return false
    },
    groupTranslatePosition() {
      const { x, y } = this.nodeData

      return `
        translate(${getRadialPoint(x, y).x}, ${getRadialPoint(x, y).y})
      `
    },

    setSubheaderTextRotation() {
      const { x } = this.nodeData
      return {
        transform: `rotate(${(x * 180) / Math.PI - 90}deg) translate(6px, 3px)`
      }
    },

    setSubheaderTextAlign() {
      const { x, children } = this.nodeData
      return {
        textAnchor: x < Math.PI === !children ? 'start' : 'end',
        transform:
          `rotate(${x >= Math.PI ? 180 : 0}deg) ` +
          `translate(${x >= Math.PI ? '0px, 5px' : '0, 0'})`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
circle {
  fill: #c6dae5;
}
.node-title {
  color: rgb(102, 153, 204);
  fill: rgb(102, 153, 204);
  font-size: 9px;
  font-weight: normal;
}

.style-active-label {
  fill: epot-color('secondary');
  color: epot-color('secondary');
}

.style-connected {
  fill: epot-color('primary', 'base');
  color: epot-color('primary', 'base');
}

.foreignObject-header-text {
  transform: translate(-3px, 5px);

  > div {
    background-color: epot-color('background', 'base', 'dark');
  }
}

.hovered {
  fill: epot-color('primary') !important;
  color: epot-color('primary') !important;
  font-size: 0.62rem;
  transition: all 0.15s ease-out;
}
</style>
