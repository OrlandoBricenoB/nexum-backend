// ============================================================
// NEXUM - Drizzle Schema: character_skills
// ============================================================

import { pgTable, uuid, integer, primaryKey } from 'drizzle-orm/pg-core'
import { characters } from './characters'

export const characterSkills = pgTable(
  'character_skills',
  {
    characterId: uuid('character_id')
      .notNull()
      .references(() => characters.id, { onDelete: 'cascade' }),
    skillId: integer('skill_id').notNull(),
    skillLevel: integer('skill_level').notNull().default(1),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.characterId, t.skillId] }),
  })
)

export type CharacterSkill = typeof characterSkills.$inferSelect
export type NewCharacterSkill = typeof characterSkills.$inferInsert
