import { integer, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { characters } from '../characters'

export const characterWallets = pgTable('character_wallets', {
  id: uuid('id').primaryKey().defaultRandom(),
  hesedias: integer('hesedias').notNull().default(0),
  nexumCoins: integer('nexum_coins').notNull().default(0),
  characterId: uuid('character_id')
    .references(() => characters.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})
