import { database } from '../../config/databaseConfig'
import { FindQuery } from '../../server/domain/FindQuery'
import { Entity } from '../domain/entity'

export class RepositoryBase<T extends Entity> {
  private collection_name: string

  constructor(collection_name: string) {
    this.collection_name = collection_name
  }

  protected async getAll(query?: FindQuery<T>): Promise<T[]> {
    return database.getAll<T>(this.collection_name, query)
  }

  protected async getByID(id: string): Promise<T | null> {
    return database.getByID<T>(this.collection_name, id)
  }

  protected async create(data: Partial<T>): Promise<boolean> {
    return database.create<T>(this.collection_name, data)
  }

  protected async update(id: string, data: Partial<T>): Promise<T> {
    return database.update<T>(this.collection_name, id, data)
  }

  protected async delete(id: string): Promise<boolean> {
    return database.delete(this.collection_name, id)
  }

  public async getDuplicatedFields(entity: T): Promise<Array<keyof T>> {
    const uniqueFields = entity.getUniqueFields() as unknown as Array<keyof T>

    const query = {
      $or: uniqueFields.map(key => ({
        [key]: entity[key]
      }))
    } as unknown as FindQuery<T>

    const result = await this.getAll(query)

    return uniqueFields.filter(key => result.some(object => object[key as 'id'] === entity[key as 'id']))
  }
}
