// @ts-check
import { Graphics, Application } from 'pixi.js'

export default class Operation extends Graphics {
  /**
   *
   * @param {Application} app
   * @param {Object} data
   * @param {number} x
   * @param {number} y
   * @param {number} radius
   * @param {number} color
   */
  constructor(app, data, x, y, radius = 80, color = 0xf5c723) {
    super()
    this.beginFill(color)
    this.drawCircle(0, 0, radius)
    this.x = x
    this.y = y
    this.radius = radius

    this.app = app

    this.data = data
    this.childNodes = []

    this.createChildNodes()
  }

  createChildNodes() {
    const spaceBetween = this.radius + 120
    for (let [index, val] of Object.entries(this.data.data)) {
      const node = new Graphics()
      node.beginFill(0xf5c723)
      node.drawCircle(0, 0, this.radius / 2.5)

      const angle = (parseInt(index) / (this.data.data.length / 2)) * Math.PI
      node.x = spaceBetween * Math.cos(angle)
      node.y = spaceBetween * Math.sin(angle)
      this.childNodes.push({ graphics: this.addChild(node), data: val })
    }

    console.log(this.childNodes[0].data)
  }
}
