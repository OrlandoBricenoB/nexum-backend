import AWS from 'aws-sdk'
import { DatabaseRepository } from './databaseRepository'

export class DynamoRepository extends DatabaseRepository {
  database: AWS.DynamoDB.DocumentClient

  constructor(database: AWS.DynamoDB.DocumentClient) {
    super(database)
    this.database = database
  }

  async getAll<T>(_collectionName: string): Promise<T[]> {
    return []
  }

  async getById<T>(_collectionName: string, _id: string): Promise<T | null> {
    return null
  }

  async create<T>(_collectionName: string, _data: Partial<T>): Promise<boolean> {
    return true
  }

  async update<T>(_collectionName: string, _id: string, _data: Partial<T>): Promise<T> {
    return {} as T
  }

  async delete(_collectionName: string, _id: string): Promise<boolean> {
    return true
  }
}
