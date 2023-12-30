import AWS from 'aws-sdk'
import { DatabaseRepository } from "./databaseRepository"

export class DynamoRepository extends DatabaseRepository {
  database: AWS.DynamoDB.DocumentClient

  constructor(database: AWS.DynamoDB.DocumentClient) {
    super(database)
    this.database = database
  }

  async getAll<T>(collectionName: string): Promise<T[]> {
    return []
  }

  async getById<T>(collectionName: string, id: string): Promise<T | null> {
    return null
  }

  async create<T>(collectionName: string, data: Partial<T>): Promise<void> {
  }

  async update<T>(collectionName: string, id: string, data: Partial<T>): Promise<void> {
  }

  async delete(collectionName: string, id: string): Promise<void> {
  }
}
