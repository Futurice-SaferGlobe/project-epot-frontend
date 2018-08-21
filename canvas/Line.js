import { Texture, Sprite } from 'pixi.js'

export default class Line {
  constructor(x, y, width, height) {
    const line = new Sprite(Texture.WHITE)
    line.tint = 0xff0000
    line.position.set(x, y)
    line.width = width
    line.height = height

    return line
  }
}
