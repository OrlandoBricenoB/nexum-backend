// ============================================================
// NEXUM - Drizzle Schema: items & inventory slots
// ============================================================

import { pgTable, uuid, integer, text, timestamp, index } from 'drizzle-orm/pg-core'
import { characters } from './characters/characters'

export const items = pgTable(
  'items',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    itemId: text('item_id').notNull().default(''),
    level: integer('level').notNull().default(1),
    quality: text('quality').notNull().default(''),
    characterId: uuid('character_id')
      .notNull()
      .references(() => characters.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => ({
    characterIdx: index('idx_items_character').on(t.characterId),
  })
)

export type Item = typeof items.$inferSelect
export type NewItem = typeof items.$inferInsert
