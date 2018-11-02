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
import { line, linkRadial } from 'd3-shape'
import * as d3TextWrap from 'd3-textwrap'
import eventBus from '@/plugins/eventBus'

import { styleText, style, radialPoint } from './OperationVisual/index'

function curveRadial(context, x0, y0, x1, y1) {
  var p0 = pointRadial(x0, y0),
    p1 = pointRadial(x0, (y0 = (y0 + y1) / 2)),
    p2 = pointRadial(x1, y0),
    p3 = pointRadial(x1, y1)
  context.moveTo(p0[0], p0[1])
  context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1])
}

export default {
  props: ['operation'],

  data() {
    return {
      hierarchy: null,
      svgNodesSelection: null,
      svgLinksSelection: null
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

      this.hierarchy = treeLayout(d3.hierarchy(this.transformedOperation))
      this.svgNodesSelection = d3.select(
        `svg .${this.$refs.nodes.className.baseVal}`
      )
      this.svgLinksSelection = d3.select(
        `svg .${this.$refs.links.className.baseVal}`
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
        .data(this.hierarchy.descendants().reverse())
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
        .filter(({ depth }) => depth > 0)
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
      const children = this.hierarchy.children
      const leaves = this.hierarchy.leaves()

      const nodeMap = new Map(
        [...leaves, ...children].map(leaf => [leaf.data.uid, leaf])
      )

      return this.operation.connections.map(conn => {
        return {
          source: {
            x: nodeMap.get(conn.from).x,
            y: nodeMap.get(conn.from).y
          },
          target: {
            x: nodeMap.get(conn.to).x,
            y: nodeMap.get(conn.to).y
          }
        }
      })
    },

    renderLinks() {
      const connectionLinks = this.generateLinks()

      // Create parent/child relation links
      const link = this.svgLinksSelection
        .selectAll('g.link')
        .data(connectionLinks)
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('stroke', style.titleColor.hover)
        .attr('stroke-width', '1')
        .attr('fill', 'none')
        .attr('d', ({ source, target }, i) => {
          const d = {
            M1: {
              x: radialPoint(source.x, source.y)[0],
              y: radialPoint(source.x, source.y)[1]
            },
            C1: {
              p1: {
                x: radialPoint(source.x, source.y)[0] / 2,
                y: radialPoint(source.x, source.y)[1]
              },
              p2: {
                x: radialPoint(target.x, target.y)[0] / 2,
                y: radialPoint(target.x, target.y)[1]
              },
              x: radialPoint(target.x, target.y)[0],
              y: radialPoint(target.x, target.y)[1]
            },
            L1: {
              x: radialPoint(target.x, target.y)[0],
              y: radialPoint(target.x, target.y)[1]
            }
          }

          return (
            `M${d.M1.x} ${d.M1.y},` + // starting x/y
            `C${d.C1.p1.x} ${d.C1.p1.y},` + // bezier point x/y #1
            `${d.C1.p2.x} ${d.C1.p2.y},` + // bezier point x/y #2
            `${d.C1.x} ${d.C1.y}` // final x/y
          )
        })
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

      svgContainerEl.setAttribute(
        'viewBox',
        `${x + 10} ${y + -10} ${width + 20} ${height + 20}`
      )
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
