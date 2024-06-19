import { neon } from '@neondatabase/serverless'
import { NeonHttpDatabase, drizzle } from 'drizzle-orm/neon-http'

let database: NeonHttpDatabase<Record<string, never>>

async function connect() {
  try {
    const dbUrl =
      process.env.MODE === 'production' ? process.env.DATABASE_URL : process.env.DEV_DATABASE_URL
    if (dbUrl) {
      const sql = neon(dbUrl)
      database = drizzle(sql)
    } else {
      throw new Error('Invalid database type')
    }
    console.log(`Connected to ${process.env.MODE} database.`)
  } catch (error) {
    console.log('Error connecting to the database:', error)
  }
}

export { connect, database }
