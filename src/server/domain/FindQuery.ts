export type FindQuery<T> = {
  [P in keyof T]?: T[P]
}
