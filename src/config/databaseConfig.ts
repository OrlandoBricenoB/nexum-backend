import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { Database } from '../shared/types/Database'

async function connect(dbUrl: string) {
  try {
    let database: Database
    if (dbUrl) {
      const sql = neon(dbUrl)
      database = drizzle(sql)
    } else {
      throw new Error('Invalid database type')
    }

    return database
  } catch (error) {
    console.log('Error connecting to the database:', error)
    throw new Error('Error connecting to the database')
  }
}

export { connect }
