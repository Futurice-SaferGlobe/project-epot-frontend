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
    renderStuff() {
      const treeLayout = d3
        .tree()
        .size([2 * Math.PI, 200])
        .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth) // hierarchy separation logic

      const hierarchyPointNode = treeLayout(
        d3.hierarchy(this.transformedOperation)
      )
      const svgNodesSelection = d3.select(
        `svg .${this.$refs.nodes.className.baseVal}`
      )

      const node = svgNodesSelection
        .selectAll('circle.node')
        .data(hierarchyPointNode.descendants().reverse())
        .enter()
        .append('g')
        .classed('node', true)
        .attr('fill', 'white')
        .attr('transform', (d, index) => {
          return `
            rotate(${(d.x * 180) / Math.PI - 90})
            translate(${d.y}, 0)
          `
          // if (d.depth === 1) {
          //   const { length } = this.operation.headers
          //   const angle = (parseInt(index) / (length / 2)) * Math.PI
          //   const radius = 100
          //   const x = radius * Math.cos(angle)
          //   const y = radius * Math.sin(angle)
          //   return `translate(${x} ${y})`
          // } else if (d.depth > 1) {
          //   return `
          //       rotate(${(d.x * 180) / Math.PI - 90})
          //       translate(${d.y}, 0)
          //     `
          // }
        })

      const link = svgNodesSelection
        .append('g')
        .attr('fill', 'none')
        .attr('stroke', '#555')
        .attr('stroke-opacity', 0.4)
        .attr('stroke-width', 1.5)
        .selectAll('path')
        .data(hierarchyPointNode.links())
        .enter()
        .append('path')
        .attr(
          'd',
          d3
            .linkRadial()
            .angle(d => d.x)
            .radius(d => d.y)
        )

      // Balls
      const circle = node
        .append('circle')
        .attr('fill', '#C6DAE6')
        .attr('r', 2.5)

      const title = node
        .append('text')
        .style('font-size', '9')
        .attr('dy', '0.31rem')
        .text(d => {
          console.log(d)
          const hasParent = d.parent
          return `${d.x}, ${d.y}${
            hasParent ? ` : ${d.parent.x} ${d.parent.y}` : ''
          }`
        })

      this.calcSvgContainerViewBox()
    },

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
svg {
  height: 1020px;
}
* text {
  font-size: 10px !important;
}
</style>
