import { Graphics } from 'pixi.js'

export default class Operation extends Graphics {
  constructor(data, x, y, radius = 80, color = 0x148fe5) {
    super()

    this.beginFill(color)
    this.drawCircle(0, 0, radius)
    this.x = x
    this.y = y

    this.data = data

    this.createClickEvent()
  }

  createClickEvent() {}
}
