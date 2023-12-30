export class DatabaseRepository {
  database: unknown

  constructor(database: unknown) {
    this.database = database
  }

  async getAll<T>(collectionName: string): Promise<T[]> {
    throw new Error('Not implemented');
  }

  async getById<T>(collectionName: string, id: string): Promise<T | null> {
    throw new Error('Not implemented');
  }

  async create<T>(collectionName: string, data: Partial<T>): Promise<void> {
    throw new Error('Not implemented');
  }

  async update<T>(collectionName: string, id: string, data: Partial<T>): Promise<void> {
    throw new Error('Not implemented');
  }

  async delete(collectionName: string, id: string): Promise<void> {
    throw new Error('Not implemented');
  }
}
