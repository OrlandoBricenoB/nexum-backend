import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { characters } from './characters'

export const characterAppearances = pgTable('character_appearances', {
  id: uuid('id').primaryKey().defaultRandom(),
  skinTone: text('skin_tone').notNull(),
  hairstyle: text('hairstyle').notNull(),
  facestyle: text('facestyle').notNull(),
  gender: text('gender').notNull(),
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
