import type { Db } from "mongodb"
import { DatabaseRepository } from "./databaseRepository"

export class MongoRepository extends DatabaseRepository {
  database: Db

  constructor(database: Db) {
    super(database)
    this.database = database
  }

  async getAll<T>(collectionName: string): Promise<T[]> {
    const collection = this.database.collection(collectionName)
    return collection.find().toArray() as unknown as Promise<T[]>
  }

  async getById<T>(collectionName: string, id: string): Promise<T | null> {
    const collection = this.database.collection(collectionName)
    return collection.findOne({ id }) as unknown as T | null
  }

  async create<T>(collectionName: string, data: Partial<T>): Promise<void> {
    const collection = this.database.collection(collectionName)
    collection.insertOne(data)
  }

  async update<T>(collectionName: string, id: string, data: Partial<T>): Promise<void> {
    const collection = this.database.collection(collectionName)
    collection.updateOne({ id }, { $set: data })
  }

  async delete(collectionName: string, id: string): Promise<void> {
    const collection = this.database.collection(collectionName)
    collection.deleteOne({ id })
  }
}
