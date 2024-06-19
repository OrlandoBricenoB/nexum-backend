import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { AccountService } from '../account/services/accountService'
import { CharacterService } from '../character/services/characterService'
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
    console.log(`Connected to ${process.env.MODE} database.`)

    const accountService = AccountService(database)
    const accounts = await accountService.getAccounts()
    const characterService = CharacterService(database)
    const characters = await characterService.getAllCharacters()
    console.log({ accounts })
    console.log({ characters })

    return database
  } catch (error) {
    console.log('Error connecting to the database:', error)
    throw new Error('Error connecting to the database')
  }
}

export { connect }
