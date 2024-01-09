import { pick } from 'lodash'

export class Entity {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static create<T extends Entity>(this: new (...args: any[]) => T, data: Partial<T>): T {
    const empty = new this()
    const keys = Object.keys(empty)

    return pick(data, keys) as T
  }
}
