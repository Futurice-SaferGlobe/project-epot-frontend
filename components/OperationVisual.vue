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
        size: 243,
        fontSize: 11,
        nodeColor: '#C6DAE6',
        titleColor: '#6699CC',
        nodeSize: 2.5
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
        .size([2 * Math.PI, this.style.size])
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
          ({ depth }) => (depth >= 1 ? this.style.nodeColor : 'transparent')
        )
        .attr('r', this.style.nodeSize)

      // Render subheader titles
      const title = node
        .append('text')
        .filter(({ depth }) => depth === 2)
        .call(this.styleText)
        .attr('dy', '0.31rem')
        .attr('x', d => {
          const padding = this.style.nodeSize + 10
          return d.x < Math.PI === !d.children ? padding : -padding
        })
        .attr(
          'text-anchor',
          d => (d.x < Math.PI === !d.children ? 'start' : 'end')
        )
        .attr('transform', d => (d.x >= Math.PI ? 'rotate(180)' : null))
        .text(({ data: { title } }) => title)
        .on('mouseover', () => console.log('hei'))

      // Render headers separately
      const wrap = d3TextWrap.textwrap().bounds({ height: 100, width: 80 })
      const textwrap = node
        .append('g')
        .attr('transform', (d, index) => {
          const rotation = (d.x * -180) / Math.PI - 90
          const translateX = -this.style.nodeSize
          const translateY = this.style.nodeSize + 5

          return `
              rotate(${rotation}) scale(-1, -1) translate(${translateX}, ${translateY})
            `
        })
        .filter(({ depth }) => depth === 1)
        .call(this.styleText)
        .append('text')
        .text(({ data: { title } }) => title)
        .call(wrap)

      function mouseOverListener() {
        console.log(this)
      }
    },

    styleText(selection) {
      selection
        .style('color', this.style.titleColor)
        .style('fill', this.style.titleColor)
        .style('font-size', this.style.fontSize)
        .style('font-family', 'sans-serif')
    },

    createText(selection, desiredDepth) {
      selection.text(({ children, depth, data: { title } }) => {
        if (depth === desiredDepth) {
          return title
        }
      })
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

    mouseOverListener(selection) {
      console.log('this')
      // d3.select(this).style('color', 'red')
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
  }
}
</style>
