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

export default {
  props: ['operation'],

  data() {
    return {
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

    svgContainerStructure() {
      return {}
    }
  },

  methods: {
    /**
     * Render visuals in D3. TODO: Break these up into separate methods.
     */
    renderStuff() {
      const treeLayout = d3
        .tree()
        .size([2 * Math.PI, 200])
        .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth) // hierarchy separation logic

      const hierarchyPointNode = treeLayout(
        d3.hierarchy(this.transformedOperation)
      )
      this.svgNodesSelection = d3.select(
        `svg .${this.$refs.nodes.className.baseVal}`
      )

      // Transform tree into circle
      const node = this.svgNodesSelection
        .selectAll('circle.node')
        .data(hierarchyPointNode.descendants().reverse())
        .enter()
        .append('g')
        .classed('node', true)
        .attr('fill', 'white')
        .attr('class', d => (d.depth === 1 ? 'node header' : 'node subheader'))
        .attr('transform', (d, index) => {
          if (d.depth <= 1) {
            // Position headers separately from subheaders
            const size = 120
            const angle =
              (parseInt(index) / (this.operation.headers.length / 2)) * Math.PI

            return `
              translate(${size * Math.cos(angle)}, ${size * Math.sin(angle)})
            `
          } else {
            // Rotate subheaders in a circular fashion.
            return `
              rotate(${(d.x * 180) / Math.PI - 90})
              translate(${d.y}, 0)
            `
          }
        })

      // Balls
      const circle = node
        .append('circle')
        .attr('fill', '#C6DAE6')
        .attr('r', 2.5)

      // Render subheader titles
      const title = node
        .append('text')
        .style('font-size', '9')
        .style('fill', '#6699CC')
        .attr('dy', '0.31rem')
        .attr('x', 10)
        .text(({ children, depth, data: { title } }) => {
          console.log(children)
          if (depth === 2) {
            return title
          }
        })

      // Render headers separately using spans (no text-wrapping in SVG 1.1)
      const foreignObject = node.append('foreignObject')
      const div = foreignObject
        .append('xhtml:div')
        .style('font-size', '0.6rem')
        .style('line-height', '1')
        .append('div')
      // console.log(div)
      const span = div
        .append('span')
        .style('display', 'inline-block')
        .style('margin-left', '-2px')
        .style('margin-top', '6px')
        .style('color', '#6699CC')
        .style('width', '80px')
        .html(({ depth, data: { title } }) => (depth === 1 ? title : null))

      // // Create parent/child relation links
      // const link = this.svgNodesSelection
      //   .append('g')
      //   .attr('fill', 'none')
      //   .attr('stroke', 'white')
      //   .attr('stroke-opacity', 0.2)
      //   .attr('stroke-width', 1.5)
      //   .selectAll('path')
      //   .data(hierarchyPointNode.links())
      //   .enter()
      //   .append('path')
      //   .attr(
      //     'd',
      //     d3
      //       .linkRadial()
      //       .radius(d => d.y)
      //       .angle(d => d.x)
      //   )

      this.calcSvgContainerViewBox()
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
    this.renderStuff()
  }
}
</script>

<style lang="scss" scoped>
.operation-visual {
  svg {
    height: 100vh;
  }
}
</style>
