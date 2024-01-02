export class DatabaseRepository {
  database: unknown

  constructor(database: unknown) {
    this.database = database
  }

  async getAll<T>(_collectionName: string): Promise<T[]> {
    throw new Error('Not implemented')
  }

  async getByID<T>(_collectionName: string, _id: string): Promise<T | null> {
    throw new Error('Not implemented')
  }

  async create<T>(_collectionName: string, _data: Partial<T>): Promise<boolean> {
    throw new Error('Not implemented')
  }

  async update<T>(_collectionName: string, _id: string, _data: Partial<T>): Promise<T> {
    throw new Error('Not implemented')
  }

  async delete(_collectionName: string, _id: string): Promise<boolean> {
    throw new Error('Not implemented')
  }
}
