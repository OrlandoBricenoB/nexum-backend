import { DynamoRepository } from '../server/repositories/dynamoRepository'
import { MongoRepository } from '../server/repositories/mongoRepository'

import { MongoClient } from 'mongodb'
import AWS from 'aws-sdk'

let client: MongoClient | AWS.DynamoDB.DocumentClient
let database: MongoRepository | DynamoRepository

async function connect() {
  try {
    if (process.env.DATABASE_TYPE === 'MONGODB') {
      const mongoUri = process.env.MONGODB_URI || ''
      const dbName = process.env.MONGODB_DB_NAME
      client = await MongoClient.connect(mongoUri)

      const databaseClient = client.db(dbName)
      database = new MongoRepository(databaseClient)
    } else if (process.env.DATABASE_TYPE === 'DYNAMODB') {
      const dynamoDbConfig = {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
      }
      AWS.config.update(dynamoDbConfig)
      const dynamoDb = new AWS.DynamoDB.DocumentClient()

      client = dynamoDb
      database = new DynamoRepository(client)
    } else {
      throw new Error('Invalid database type')
    }
    console.log(`Connected to ${process.env.DATABASE_TYPE}.`)
  } catch (error) {
    console.log('Error connecting to the database:', error)
  }
}

function disconnect() {
  if (client) {
    // client.close();
    console.log('Disconnected from the database')
  }
}

export { connect, disconnect, database }
