<template>
  <div 
    class="operation-visual"
    @mousemove="translateView"
    @mouseleave="translateView"
    ref="visualWrapper" 
  >
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
import { mapState } from 'vuex'
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
    ...mapState(['pageMap']),
    transformedOperation() {
      const { headers, ...rest } = this.operation

      // D3 hierarchy nodes apparently require the arrays to be named as `children`.
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
    },

    visualWrapperRect() {
      return this.$refs.visualWrapper.getBoundingClientRect()
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

      this.$nextTick(() => {
        this.calcSvgContainerViewBox(
          // see the method declaration for explanation of this madness...
          this.pageMap.find(page => page.name === this.$route.name).hasVisited
        )
      })
    },

    /**
     * @param {boolean} includeBodyHeight should the calculation
     * take in account the page's possible css translation?
     */
    calcSvgContainerViewBox(includeBodyHeight) {
      /** @type HTMLElement */
      const svgContainerEl = this.$refs.svgContainer
      const {
        width,
        height,
        x,
        y: originalY,
        bottom,
        right
      } = this.$refs.visualGroup.getBoundingClientRect()

      /**
       * If the page transitioned from another page, the fancy CSS
       * jump transition causes the bounding box (x,y) of the svg group
       * to be misplaced. This negates it by using the body elements'
       * height, making it correct again.
       */
      const y = includeBodyHeight
        ? originalY + document.body.getBoundingClientRect().height - 68
        : originalY - 68

      svgContainerEl.setAttribute(
        'viewBox',
        `${x} ${y} ${width} ${height + 68}`
      )
    },

    /**
     * Magnet-ish svg translation based on cursor position
     */
    translateView({ x, y, type }) {
      //   if (type === 'mousemove') {
      //     const relCenterX =
      //       x - (this.visualWrapperRect.left + this.visualWrapperRect.width / 2)
      //     const relCenterY =
      //       y - (this.visualWrapperRect.top + this.visualWrapperRect.height / 2)
      //     if (Math.abs(relCenterX) <= 10000 && Math.abs(relCenterY) <= 10000) {
      //       const x = (parseInt(relCenterX) / 5) * -1
      //       const y = (parseInt(relCenterY) / 5) * -1
      //       this.$refs.visualWrapper.style.transform =
      //         `scale(1.0, 1.0) ` + `translate3D(${x}px, ${y}px, 0px`
      //     } else {
      //       this.$refs.visualWrapper.style.transform = `translate3D(0, 0, 0)`
      //     }
      //   } else if (type === 'mouseleave') {
      //     this.$refs.visualWrapper.style.transform = `translate3D(0, 0, 0)`
      //   }
    }
  }
}
</script>

<style lang="scss" scoped>
.operation-visual {
  -webkit-backface-visibility: hidden;
  width: 100%;
  transition: transform 0.15s ease-out;
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
