// ============================================================
// NEXUM - Drizzle Schema: character_past_lifes
// ============================================================

import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { characters } from './characters'

export const characterPastLifes = pgTable('character_past_lifes', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().default(''),
  kingdom: text('kingdom').notNull().default(''),
  rank: text('rank').notNull().default(''),
  honor: integer('honor').notNull().default(0),
  rebirth: integer('rebirth').notNull().default(0),
  kills: integer('kills').notNull().default(0),
  deaths: integer('deaths').notNull().default(0),
  assists: integer('assists').notNull().default(0),
  characterId: uuid('character_id')
    .references(() => characters.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

export type CharacterPastLife = typeof characterPastLifes.$inferSelect
export type NewCharacterPastLife = typeof characterPastLifes.$inferInsert
