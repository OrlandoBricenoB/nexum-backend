import { isNil, omit } from 'lodash'
import { DataEntitiesByKey, EntityKeys } from '../types/Entities'

export type EntityGet<T extends EntityKeys> = () => Partial<DataEntitiesByKey[T]>
export type EntityGetPrivateFields = () => string[]
export type EntityGetUniqueFields = () => string[]
export type EntityIsComplete = () => boolean

export function Entity<T extends EntityKeys>({
  privateFields,
  uniqueFields,
  data,
}: {
  privateFields: string[]
  uniqueFields: string[]
  data: Partial<DataEntitiesByKey[T]>
}): {
  getPrivateFields: EntityGetPrivateFields
  getUniqueFields: EntityGetUniqueFields
  getInfo: EntityGet<T>
  isComplete: EntityIsComplete
} {
  // TODO: Comprobar si funcionó el defineProperty.
  // const get: EntityGet<T> = () => {
  //   return data
  // }

  const getPrivateFields: EntityGetPrivateFields = () => {
    return privateFields
  }

  const getUniqueFields: EntityGetUniqueFields = () => {
    return uniqueFields
  }

  const getInfo: EntityGet<T> = () => {
    return omit({ ...data }, getPrivateFields()) as unknown as Partial<DataEntitiesByKey[T]>
  }

  const isComplete: EntityIsComplete = () => {
    const values = Object.values(data)

    return values.every((value) => !isNil(value))
  }

  return {
    getPrivateFields,
    getUniqueFields,
    getInfo,
    isComplete,
  }
}
