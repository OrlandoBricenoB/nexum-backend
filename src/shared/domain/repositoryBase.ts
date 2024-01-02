import { database } from '../../config/databaseConfig'

export class RepositoryBase<T> {
  private collection_name: string

  constructor(collection_name: string) {
    this.collection_name = collection_name
  }

  protected async getAll(): Promise<T[]> {
    return database.getAll<T>(this.collection_name)
  }

  protected async getById(id: string): Promise<T | null> {
    return database.getById(this.collection_name, id)
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
}
