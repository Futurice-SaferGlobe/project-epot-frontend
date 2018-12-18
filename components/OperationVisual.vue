<template>
  <div class="operation-visual">
    <svg 
      v-if="hierarchy" 
      ref="svgContainer" 
      class="svg-container"
      focusable="true" 
      tabindex="0"
      version="1.1" 
      xmlns="http://www.w3.org/2000/svg" 
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <g ref="visualGroup" class="visual-group">
        <g class="arcs">
          <svg-arc
            v-for="(connection, index) in connectionLinks" 
            :key="index"
            :connectionData="connection"
            :elementId="index"
          />
        </g>
        <g class="nodes">
          <svg-node 
            v-for="(node, index) in hierarchy.descendants()" 
            :key="index" 
            :nodeData="node"
          />
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import Vue from 'vue'
import * as d3 from 'd3'
import { line, linkRadial } from 'd3-shape'
import * as d3TextWrap from 'd3-textwrap'
import eventBus from '@/plugins/eventBus'
import SvgNode from './OperationVisual/SvgNode'
import SvgArc from './OperationVisual/SvgArc'

import {
  styleText,
  style,
  getRadialPoint,
  generatePathCurve,
  generateLinks,
  addMouseEvents
} from './OperationVisual/index'

export default {
  props: ['operation'],

  data() {
    return {
      hierarchy: null,
      svgNodesSelection: null,
      svgLinksSelection: null
    }
  },
  components: {
    SvgNode,
    SvgArc
  },

  computed: {
    // D3 hierarchy nodes apparently requires the arrays to be named as `children`.
    transformedOperation() {
      const { headers, ...rest } = this.operation
      return {
        ...rest,
        children: headers.map(({ subheaders, ...rest }) => ({
          ...rest,
          children: subheaders
        }))
      }
    },
    connectionLinks() {
      return generateLinks(
        [...this.hierarchy.children, ...this.hierarchy.leaves()],
        this.operation.connections
      )
    }
  },

  mounted() {
    this.initD3View()
  },

  methods: {
    /**
     * Initializes D3 Treelayout
     */
    initD3View() {
      const treeLayout = d3
        .tree()
        .size([2 * Math.PI, style.size])
        .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth) // hierarchy separation logic

      this.hierarchy = treeLayout(d3.hierarchy(this.transformedOperation))

      Vue.nextTick(() => {
        this.calcSvgContainerViewBox()
      })
    },

    calcSvgContainerViewBox() {
      /** @type HTMLElement */
      console.log(this.$refs.visualGroup)
      const svgContainerEl = this.$refs.svgContainer
      const {
        width,
        height,
        x,
        y
      } = this.$refs.visualGroup.getBoundingClientRect()

      svgContainerEl.setAttribute(
        'viewBox',
        `${x} ${y - 50} ${width} ${height}`
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.operation-visual {
  width: 100%;
  svg {
    width: 100%;
    height: 98vh;
    * {
      cursor: default;
    }
  }
}

foreignObject {
  div {
    background-color: green;
  }
}
</style>
<style lang="scss">
svg {
  &:focus {
    outline: none;
  }
}
.node-focus {
  color: epot-color('primary', 'base') !important;
  fill: epot-color('primary', 'base') !important;
  * {
    color: epot-color('primary', 'base') !important;
    fill: epot-color('primary', 'base') !important;
  }
}
</style>
