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

export default {
  props: ['operation'],

  data() {
    return {
      hierarchyPointNode: null,
      svgNodesSelection: null,
      style: {
        fontSize: 11
      }
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
        .size([2 * Math.PI, 200])
        .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth) // hierarchy separation logic

      this.hierarchyPointNode = treeLayout(
        d3.hierarchy(this.transformedOperation)
      )
      this.svgNodesSelection = d3.select(
        `svg .${this.$refs.nodes.className.baseVal}`
      )

      this.renderNodes()
      // this.renderLinks()
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
        .attr('fill', 'white')
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
        .attr('fill', ({ depth }) => (depth >= 1 ? '#C6DAE6' : 'transparent'))
        .attr('r', 2.5)

      // Render subheader titles
      const title = node
        .append('text')
        .style('font-size', this.style.fontSize)
        .style('fill', '#6699CC')
        .style('font-family', 'sans-serif')
        .attr('dy', '0.31rem')
        .attr('x', d => (d.x < Math.PI === !d.children ? 10 : -10))
        .attr(
          'text-anchor',
          d => (d.x < Math.PI === !d.children ? 'start' : 'end')
        )
        .attr('transform', d => (d.x >= Math.PI ? 'rotate(180)' : null))
        .text(({ children, depth, data: { title } }) => {
          if (depth === 2) {
            return title
          }
        })

      const wrap = d3TextWrap.textwrap().bounds({ height: 100, width: 100 })
      const textwrap = node
        .append('g')
        .attr(
          'transform',
          (d, index) =>
            `rotate(${(d.x * -180) / Math.PI -
              90}) scale(-1, -1) translate(-2, 5)`
        )
        .style('color', '#6699CC')
        .style('font-size', this.style.fontSize)
        .style('font-family', 'sans-serif')
        .append('text')
        .text(({ depth, data: { title } }) => (depth === 1 ? title : null))
        .call(wrap)

      // // Render headers separately using spans (no text-wrapping in SVG 1.1)
      // const foreignObject = node
      //   .append('foreignObject')
      //   .attr('x', 0)
      //   .attr('y', 0)
      //   .attr('width', 100)
      //   .attr('height', 100)
      // const div = foreignObject
      //   .append('xhtml:div')
      //   .style('font-size', '0.6rem')
      //   .style('line-height', '1')
      //   .style('position', 'fixed')
      //   .style(
      //     'transform',
      //     (d, index) =>
      //       `rotate(${(d.x * -180) / Math.PI - 90}deg) scale(-1, -1)`
      //   )

      // const span = div
      //   .append('p')
      //   .style('margin-left', '-2px')
      //   .style('margin-top', '6px')
      //   .style('color', '#6699CC')
      //   .style('width', '80px')
      //   .text(({ depth, data: { title } }) => (depth === 1 ? title : null))
    },

    renderLinks() {
      // Create parent/child relation links
      const link = this.svgNodesSelection
        .append('g')
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('stroke-opacity', 0.2)
        .attr('stroke-width', 1.5)
        .selectAll('path')
        .data(this.hierarchyPointNode.links())
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
    height: 100vh;
  }
}
</style>
