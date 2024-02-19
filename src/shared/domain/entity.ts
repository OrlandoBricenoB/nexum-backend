import { omit } from 'lodash'
import { v4 as uuid } from 'uuid'

export class Entity {
  public id?: string

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static create<T extends Entity>(this: new (...args: any[]) => T, data: Partial<T> | null): T | null {
    if (!data) return data

    const empty = new this()

    for (const key in empty) {
      empty[key] = data[key] as T[Extract<keyof T, string>]
    }

    return empty
  }

  public new(): void {
    this.id = uuid()
  }

  protected getPrivateFields(): string[] {
    return []
  }

  public getUniqueFields(): string[] {
    return []
  }

  public getInfo(): Partial<this> {
    return omit({ ...this }, this.getPrivateFields()) as Partial<this>
  }

  public isComplete(): boolean {
    const values = Object.values(this)

    return !values.includes(undefined) && !values.includes(null)
  }
}
