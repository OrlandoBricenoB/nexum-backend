import { integer, numeric, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core'
import { characters } from '../characters'

export const characterMurderStats = pgTable('character_murder_stats', {
  id: uuid('id').primaryKey().defaultRandom(),
  honor: integer('honor').notNull().default(0),
  kills: integer('kills').notNull().default(0),
  deaths: integer('deaths').notNull().default(0),
  assists: integer('assists').notNull().default(0),
  deathCount: numeric('death_count', { precision: 100, scale: 2 }).notNull().default('1.00'),
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
