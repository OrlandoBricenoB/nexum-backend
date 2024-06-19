import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { accounts } from '../accounts/accounts'

export const characters = pgTable('characters', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  kingdom: text('kingdom').notNull(),
  division: text('division').notNull(),
  clan: text('clan').notNull().default(''),
  profession: text('profession').notNull().default(''),
  slot: text('slot').notNull().default('-1'),
  accountId: uuid('account_id')
    .references(() => accounts.id, {
      onDelete: 'set null',
    })
    .notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})
