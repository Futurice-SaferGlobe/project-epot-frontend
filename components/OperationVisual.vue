<template>
  <div class="operation-visual">
    <svg ref="svgContainer" class="svg-container">
      <g ref="visualGroup" class="visual-group">
        <g ref="links" class="links"></g>
        <g ref="nodes" class="nodes"></g>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import * as d3TextWrap from 'd3-textwrap'
import eventBus from '@/plugins/eventBus'

import { styleText, style } from './OperationVisual/index'

console.log(styleText)

export default {
  props: ['operation'],

  data() {
    return {
      hierarchyPointNode: null,
      svgNodesSelection: null
    }
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

    transformedConnection() {
      const { connections } = this.operation
      return connections.map(conn => ({
        source: conn.from,
        target: conn.to
      }))
    },

    svgContainerStructure() {
      return {}
    }
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

      this.hierarchyPointNode = treeLayout(
        d3.hierarchy(this.transformedOperation)
      )
      this.svgNodesSelection = d3.select(
        `svg .${this.$refs.nodes.className.baseVal}`
      )

      this.renderNodes()
      this.renderLinks()

      this.calcSvgContainerViewBox()
    },

    /**
     * Creates operation visuals
     */
    renderNodes() {
      // Transform tree layout into circle
      const node = this.svgNodesSelection
        .selectAll('circle.node')
        .data(this.hierarchyPointNode.descendants().reverse())
        .enter()
        .append('g')
        .classed('node', true)
        .attr('class', d => (d.depth === 1 ? 'node header' : 'node subheader'))
        .attr('transform', (d, index) => {
          return `
            rotate(${(d.x * 180) / Math.PI - 90})
            translate(${d.y}, 0)
          `
        })

      // Render Circles
      const circle = node
        .append('circle')
        .attr(
          'fill',
          ({ depth }) => (depth >= 1 ? style.nodeColor : 'transparent')
        )
        .attr('r', style.nodeSize)

      // Render subheader titles
      const title = node
        .append('text')
        .filter(({ depth }) => depth === 2)
        .call(styleText)
        .attr('dy', '0.31rem')
        .attr('x', d => {
          const padding = style.nodeSize + 10
          return d.x < Math.PI === !d.children ? padding : -padding
        })
        .attr(
          'text-anchor',
          d => (d.x < Math.PI === !d.children ? 'start' : 'end')
        )
        .attr('transform', d => (d.x >= Math.PI ? 'rotate(180)' : null))
        .text(({ data: { title } }) => title)
        .attr('class', 'subheader-title')
        .call(this.mouseEvent)

      // Render headers separately
      const wrap = d3TextWrap.textwrap().bounds({ height: 100, width: 80 })
      const textwrap = node
        .append('g')
        .attr('class', 'header-title')
        .call(this.mouseEvent)
        .attr('transform', (d, index) => {
          const rotation = (d.x * -180) / Math.PI - 90
          const translateX = -style.nodeSize
          const translateY = style.nodeSize + 5

          return `
              rotate(${rotation}) scale(-1, -1) translate(${translateX}, ${translateY})
            `
        })
        .filter(({ depth }) => depth === 1)
        .call(styleText)
        .append('text')
        .text(({ data: { title } }) => title)
        .call(wrap)
    },

    mouseEvent(targetSelection) {
      const { hover, normal } = style.titleColor

      targetSelection
        .on('mouseover', function mouseoverListener() {
          const selection = d3.select(this)

          selection
            .style('fill', hover)
            .style('color', hover)
            .style('font-weight', 'bold')
        })
        .on('mouseout', function mouseoutListener() {
          const selection = d3.select(this)

          selection
            .style('fill', normal)
            .style('color', normal)
            .style('font-weight', 'normal')
        })
        .on('click', function mouseclickListener(node) {
          const selection = d3.select(this)

          eventBus.$emit(
            'operationClick',
            !node.parent
              ? [node.data.index, 1]
              : [node.parent.data.index, node.data.index]
          )
        })
    },

    generateLinks() {
      const children = this.hierarchyPointNode.children
      const leaves = this.hierarchyPointNode.leaves()
      console.log('leaves', children)

      const nodeMap = new Map(
        [...leaves, ...children].map(leaf => [leaf.data.uid, leaf])
      )

      return this.transformedConnection.map(conn => {
        return {
          source: {
            x: nodeMap.get(conn.source).x,
            y: nodeMap.get(conn.source).y
          },
          target: {
            x: nodeMap.get(conn.target).x,
            y: nodeMap.get(conn.target).y
          }
        }
      })
    },

    renderLinks() {
      const connectionLinks = this.generateLinks()

      // Create parent/child relation links
      const link = this.svgNodesSelection
        .append('g')
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-opacity', 1)
        .attr('stroke-width', 1.5)
        .selectAll('path')
        .data(connectionLinks)
        .enter()
        .append('path')
        .attr(
          'd',
          d3
            .linkRadial()
            .radius(d => d.y)
            .angle(d => d.x)
        )
    },

    /**
     * Fit render into its parent container
     */
    calcSvgContainerViewBox() {
      /** @type HTMLElement */
      const svgContainerEl = this.$refs.svgContainer
      const {
        width,
        height,
        x,
        y
      } = this.$refs.visualGroup.getBoundingClientRect()

      svgContainerEl.setAttribute('viewBox', `${x} ${y} ${width} ${height}`)
    }
  },

  mounted() {
    this.initD3View()
  }
}
</script>

<style lang="scss" scoped>
.operation-visual {
  svg {
    width: 50vw;
    height: 100vh;
    * {
      cursor: default;
    }
  }
}
</style>
