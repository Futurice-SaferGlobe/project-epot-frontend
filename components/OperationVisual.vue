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
      this.svgNodesSelection = d3.select(
        `svg .${this.$refs.nodes.className.baseVal}`
      )
      this.svgLinksSelection = d3.select(
        `svg .${this.$refs.links.className.baseVal}`
      )

      this.renderNodes()
      this.renderLinks()
      this.createMouseEvents()
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
        .attr('transform', ({ x, y }, index) => {
          return `
            rotate(${(x * 180) / Math.PI - 90})
            translate(${y}, 0)
          `
        })

      // Render Circles
      const circle = node
        .append('circle')
        .filter(({ depth }) => depth > 0)
        .attr('fill', ({ depth }) =>
          depth >= 1 ? style.nodeColor : 'transparent'
        )
        .attr('r', style.nodeSize)

      // Render subheader titles
      const title = node
        .append('g')
        .call(this.addTitleGroupDataAttributes)
        .append('text')
        .filter(({ depth }) => depth === 2)
        .call(styleText)
        .attr('dy', '0.31rem')
        .attr('x', d => {
          const padding = style.nodeSize + 10
          return d.x < Math.PI === !d.children ? padding : -padding
        })
        .attr('text-anchor', d =>
          d.x < Math.PI === !d.children ? 'start' : 'end'
        )
        .attr('transform', d => (d.x >= Math.PI ? 'rotate(180)' : null))
        .text(({ data: { title } }) => title)
        .attr('class', ({ data: { uid } }) => `${uid}`)

      // Render headers separately
      const wrap = d3TextWrap.textwrap().bounds({ height: 100, width: 100 })
      const textwrap = node
        .append('g')
        .attr('transform', (d, index) => {
          const rotation = (d.x * -180) / Math.PI - 90
          const translateX = -style.nodeSize
          const translateY = style.nodeSize + 5

          return `
              rotate(${rotation}) scale(-1, -1) translate(${translateX}, ${translateY})
            `
        })
        .append('g')
        .call(this.addTitleGroupDataAttributes)
        .attr('class', ({ data: { uid } }) => `title-group ${uid}`)
        .filter(({ depth }) => depth === 1)
        .call(styleText)
        .append('text')
        .text(({ data: { title } }) => title)
        .call(wrap)

      // create background color for text divs
      Array.from(document.querySelectorAll('foreignObject div')).forEach(
        div => {
          div.style.backgroundColor = style.titleBg
        }
      )
    },

    createMouseEvents() {
      Array.from(this.$el.querySelectorAll('.title-group')).forEach(
        titleGroup =>
          addMouseEvents(titleGroup, {
            onMouseClick: ({ uid, depth, target }) => {
              this.$el
                .querySelectorAll('.title-group')
                .forEach(g =>
                  g.firstChild
                    ? g.firstChild.classList.remove('node-focus')
                    : null
                )
              target.firstChild.classList.add('node-focus')
              try {
                target.firstChild.style.fill = style.titleColor.hover
                target.firstChild.firstChild.style.color =
                  style.titleColor.hover
              } catch (o_O) {}
              eventBus.$emit('operationClick', { uid, depth })
            },
            onMouseOver: ({ links, target }) => {
              // style hovered element
              try {
                target.firstChild.style.fill = style.titleColor.hover
                target.firstChild.firstChild.style.color =
                  style.titleColor.hover
              } catch (o_O) {}

              // style connection elements
              links.forEach(link => {
                if (link !== '') {
                  const e = this.$refs.nodes.querySelector(`.${link}`)
                  if (e.nodeName === 'g') {
                    e.querySelector('div').style.color = style.titleColor.hover
                  } else {
                    e.style.fill = style.titleColor.hover
                  }
                }
              })
            },
            onMouseOut: ({ links, target }) => {
              // style hovered element
              try {
                target.firstChild.style.fill = style.titleColor.normal
                target.firstChild.firstChild.style.color =
                  style.titleColor.normal
              } catch (o_O) {}

              // style connection elements
              links.forEach(link => {
                if (link !== '') {
                  const e = this.$refs.nodes.querySelector(`.${link}`)
                  if (e.nodeName === 'g') {
                    e.querySelector('div').style.color = style.titleColor.normal
                  } else {
                    e.style.fill = style.titleColor.normal
                  }
                }
              })
            }
          })
      )
    },

    addTitleGroupDataAttributes(target) {
      const { links } = this.$refs

      target.attr('class', 'title-group')
      target.attr('data-type-name', ({ data: { __typename } }) => __typename)
      target.attr('data-uid', ({ data: { uid } }) => uid)
      target.attr('data-index', ({ data: { index } }) => index)
      target.attr('data-links', ({ data: { links } }) => links)

      target.attr('data-parent-header', ({ parent }) =>
        parent ? parent.data.index : null
      )
    },

    renderLinks() {
      // Create parent/child relation links
      const link = this.svgLinksSelection
        .selectAll('g.link')
        .data(this.connectionLinks)
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('data-source-uid', ({ source }) => source.uid)
        .attr('data-target-uid', ({ target }) => target.uid)
        .attr('stroke', style.lineColor.normal)
        .attr('stroke-width', '1')
        .attr('fill', 'none')
        .attr('d', ({ source, target, isInnerConnection, innerToInner }, i) => {
          if (innerToInner) {
            const d = generatePathCurve({ source, target, linear: true })

            return (
              `M${d.start.x} ${d.start.y},` +
              `${
                d.end.x // starting x/y
              }, ${d.end.y}` // final x/y
            )
          } else {
            const d = generatePathCurve({ source, target })
            return (
              `M${d.start.x}, ${d.start.y} ` + // starting x/y
              `C${d.curve.p1.x}, ${d.curve.p1.y} ` + // bezier point x/y #1
              `${d.end.x}, ${d.end.y} ` + // bezier point x/y #2
              `${d.end.x} ${d.end.y}` // final x/y
            )
          }
        })

      if (this.connectionLinks.length <= 1) {
        // Helper for bezier curve points
        const bezierHelperGroup = this.svgLinksSelection
          .selectAll('g.link')
          .data(this.connectionLinks)
          .enter()
          .append('g')

        const bezierHelperPoint = bezierHelperGroup
          .append('rect')
          .attr('fill', 'orangered')
          .attr('x', ({ source, target, innerToInner }) => {
            if (!innerToInner) return
            const { curve } = generatePathCurve({ source, target })
            return curve.x - 5
          })
          .attr('y', ({ source, target, innerToInner }) => {
            if (!innerToInner) return
            const { curve } = generatePathCurve({ source, target })
            return curve.y - 5
          })
          .attr('width', 10)
          .attr('height', 10)
        const bezierHelperPath = bezierHelperGroup
          .append('path')
          .attr('class', 'link')
          .attr('stroke', 'gray')
          .attr('stroke-dasharray', '4')
          .attr('stroke-width', '1')
          .attr('fill', 'none')
          .attr(
            'd',
            ({ source, target, isInnerConnection, innerToInner }, i) => {
              if (!innerToInner) return
              const d = generatePathCurve({ source, target })
              return (
                `M${d.start.x} ${d.start.y}` +
                `L${d.curve.p1.x} ${d.curve.p1.y}` +
                `L${d.curve.p2.x} ${d.curve.p2.y}` +
                `L${d.end.x} ${d.end.y}`
              )
            }
          )
      }
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
.node-focus {
  color: epot-color('primary', 'base') !important;
  fill: epot-color('primary', 'base') !important;
  * {
    color: epot-color('primary', 'base') !important;
    fill: epot-color('primary', 'base') !important;
  }
}
</style>
