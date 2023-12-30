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

  async create<T>(collectionName: string, data: Partial<T>): Promise<T> {
    const collection = this.database.collection(collectionName)
    return collection.insertOne(data) as unknown as T
  }

  async update<T>(collectionName: string, id: string, data: Partial<T>): Promise<T> {
    const collection = this.database.collection(collectionName)
    return collection.updateOne({ id }, { $set: data }) as unknown as T
  }

  async delete(collectionName: string, id: string): Promise<boolean> {
    const collection = this.database.collection(collectionName)
    const response = await collection.deleteOne({ id })
    return response?.deletedCount === 1
  }
}
