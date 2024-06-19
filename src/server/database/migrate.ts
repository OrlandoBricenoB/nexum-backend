import { drizzle as neonDrizzle } from 'drizzle-orm/neon-http'
import { migrate as neonMigrate } from 'drizzle-orm/neon-http/migrator'
import { neon } from '@neondatabase/serverless'

import { config } from 'dotenv'

config({ path: '.env' })

const main = async () => {
  try {
    const dbUrl = {
      production: process.env.DATABASE_URL!,
      development: process.env.DEV_DATABASE_URL!,
    }

    const sql = neon(dbUrl.production)
    const db = neonDrizzle(sql)
    await neonMigrate(db, { migrationsFolder: './src/server/database/migrations' })

    if (dbUrl.development) {
      const devSql = neon(dbUrl.development)
      const devDb = neonDrizzle(devSql)
      await neonMigrate(devDb, { migrationsFolder: './src/server/database/migrations' })
    } else {
      console.log('No hay db de development.')
    }

    console.log('Migration completed')
    process.exit(0)
  } catch (error) {
    console.error('Error during migration:', error)
    process.exit(1)
  }
}

main()
