import { Application, Sprite, Texture, Graphics } from 'pixi.js'
import Viewport from 'pixi-viewport'

import Operation from './Operation'

export default class CanvasApplication extends Application {
  constructor() {
    super({
      transparent: true,
      resolution: window.devicePixelRatio,
      antialias: false
    })

    const { clientWidth, clientHeight } = document.documentElement
    this.documentClientWidth = clientWidth
    this.documentClientHeight = clientHeight

    this.viewport = null
    this.dragTreshold = 40
    this.worldWidth = 5000
    this.worldHeight = 5000

    this.operations = []
    this.activeOperationIndex = 0
    this.onOperationChange = null

    this.eventBus = null

    this.createViewport()
    this.resizeCanvas()
    this.setResizeEventListener()
    this.createBorders()
  }

  /**
   * Resize the canvas renderer and the viewport to match the document width/height
   */
  resizeCanvas() {
    const { clientWidth, clientHeight } = document.documentElement
    this.documentClientWidth = clientWidth
    this.documentClientHeight = clientHeight

    this.renderer.resize(this.documentClientWidth, this.documentClientHeight)
    this.viewport.resize(
      this.documentClientWidth,
      this.documentClientHeight,
      this.worldWidth,
      this.worldHeight
    )
  }

  /**
   * Create an event listener for the `resize` event, and fires off
   * an resizeCanvas method
   */
  setResizeEventListener() {
    window.addEventListener('resize', this.resizeCanvas.bind(this))
  }

  /**
   * Create the viewport
   */
  createViewport() {
    this.viewport = new Viewport({
      threshold: this.dragTreshold
    })

    this.stage.addChild(this.viewport)

    this.viewport
      .drag()
      .decelerate()
      .on('clicked', this.click.bind(this))

    this.viewport.moveCenter(this.worldWidth / 2, this.worldHeight / 2)
  }

  /**
   * Fires when the viewport gets a `clicked` event
   * @param {Object} e The click event object
   */
  click(e) {
    if (!this.onOperationChange) return

    for (let operation of this.operations) {
      if (operation.containsPoint(e.screen)) {
        this.changeActiveOperation(operation)
        return
      }
    }
  }

  /**
   * Centers the view to object
   * @param {Object} target
   * @param {Number} target.x
   * @param {Number} target.y
   */
  moveViewToTarget(target) {
    this.viewport.snap(target.x, target.y, {
      ease: 'easeOutSine',
      removeOnComplete: true,
      removeOnInterrupt: true,
      time: 500
    })
  }

  /**
   * @param {Object} operation The operation instance
   */
  changeActiveOperation(operation) {
    if (operation) {
      this.activeOperationIndex = this.operations.indexOf(operation)
      this.moveViewToTarget({ x: operation.x, y: operation.y })
      this.onOperationChange({ operation })
      return
    }

    if (this.activeOperationIndex <= this.operations.length) {
      try {
        this.activeOperationIndex += 1
        this.moveViewToTarget(this.operations[this.activeOperationIndex])
        this.onOperationChange({
          operation: this.operations[this.activeOperationIndex]
        })
      } catch (e) {
        this.activeOperationIndex = 0
        this.moveViewToTarget(this.operations[0])
        this.onOperationChange({
          operation: this.operations[0]
        })
      }
    }
  }

  /**
   * Create operation entities in bulk
   * @param {Array} operations
   */
  createOperations(operations) {
    let pad = 0
    for (let operation of operations) {
      pad = pad + 10
      this.operations.push(
        this.viewport.addChild(new Operation(operation, 50 * pad, 50 * pad, 80))
      )
    }
  }

  /**
   * Create a single operation entity
   * @param {Object} operation
   * @param {Number} x the x position
   * @param {Number} y the y position
   */
  createOperation(operationData, x, y) {}

  line(x, y, width, height) {
    const line = this.viewport.addChild(new Sprite(Texture.WHITE))
    line.tint = 0xff0000
    line.position.set(x, y)
    line.width = width
    line.height = height
  }

  /**
   * Creates borders around the edges of the viewport world
   */
  createBorders() {
    const borderWidth = 1
    this.line(0, 0, this.viewport.worldWidth, borderWidth)
    this.line(
      0,
      this.viewport.worldHeight - borderWidth,
      this.viewport.worldWidth,
      borderWidth
    )
    this.line(0, 0, borderWidth, this.viewport.worldHeight)
    this.line(
      this.viewport.worldWidth - borderWidth,
      0,
      borderWidth,
      this.viewport.worldHeight
    )
  }

  emit(payload) {
    console.log('hello from canvas')
    console.log(payload)
  }
}
