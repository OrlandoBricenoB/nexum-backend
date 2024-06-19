import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { accounts } from './accounts'
import { characters } from '../characters/characters'

export const accountSessions = pgTable('account_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  accountId: uuid('account_id')
    .references(() => accounts.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  name: text('name').notNull(),
  ip: text('ip').notNull().default(''),
  characterId: uuid('character_id').references(() => characters.id, {
    onDelete: 'set null',
  }),
  lastSeenAt: timestamp('last_seen_at').notNull().defaultNow(),
  expiredAt: timestamp('expired_at').notNull().defaultNow(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})
