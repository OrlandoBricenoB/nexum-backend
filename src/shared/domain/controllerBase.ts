export class ControllerBase {
  constructor() {
    this.bindMethods()
  }

  private bindMethods(): void {
    const controllerClass = this.constructor
    const keys = Object.getOwnPropertyNames(controllerClass.prototype)

    keys.forEach(k => {
      const key = k as keyof this

      const value = this[key]

      if (value instanceof Function) {
        this[key] = value.bind(this) as this[keyof this]
      }
    })
  }
}
