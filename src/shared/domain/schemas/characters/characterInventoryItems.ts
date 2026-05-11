// ============================================================
// NEXUM - Drizzle Schema: character_inventory_items
// ============================================================

import { pgTable, uuid, integer, text, timestamp, index } from 'drizzle-orm/pg-core'
import { characters } from './characters'
import { items } from '../items'

export const characterInventoryItems = pgTable(
  'character_inventory_items',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    inventory: integer('inventory').notNull().default(0),
    slot: text('slot').notNull().default(''),
    stack: integer('stack').notNull().default(0),
    itemId: uuid('item_id')
      .notNull()
      .references(() => items.id, { onDelete: 'cascade' }),
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
    characterIdx: index('idx_character_inventory_items_character').on(t.characterId),
  })
)

export type CharacterInventoryItem = typeof characterInventoryItems.$inferSelect
export type NewCharacterInventoryItem = typeof characterInventoryItems.$inferInsert
