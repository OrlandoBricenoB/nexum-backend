import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { characters } from '../characters'
import { characterItems } from './characterItems'

export const characterInventorySlots = pgTable('character_inventory_slots', {
  id: uuid('id').primaryKey().defaultRandom(),
  inventory: integer('inventory').notNull().default(0),
  slot: text('slot').notNull().default(''),
  stack: integer('stack').notNull().default(0),
  characterItemId: uuid('character_item_id')
    .references(() => characterItems.id, {
      onDelete: 'cascade',
    })
    .notNull(),
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
