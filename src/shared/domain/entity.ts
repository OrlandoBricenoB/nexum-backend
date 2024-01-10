import { v4 as uuid } from 'uuid'

export class Entity {
  public id?: string

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static create<T extends Entity>(this: new (...args: any[]) => T, data: Partial<T>): T {
    const empty = new this()

    for (const key in empty) {
      empty[key] = data[key] as T[Extract<keyof T, string>]
    }

    return empty
  }

  public new(): void {
    this.id = uuid()
  }

  public getInfo(): Partial<this> {
    return { ...this }
  }
}
