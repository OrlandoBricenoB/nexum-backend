import { and, eq } from 'drizzle-orm'
import {
  CharacterSkill,
  CharacterSkillData,
} from '../../shared/domain/entities/characters/skills/CharacterSkill'
import { characterSkills } from '../../shared/domain/schemas/characters/characterSkills'
import { RepositoryBase } from '../../shared/repositories/repositoryBase'
import { Database } from '../../shared/types/Database'

export class CharacterSkillsRepository extends RepositoryBase<'CharacterSkill'> {
  constructor(db: Database) {
    super(characterSkills, CharacterSkill, db)
  }

  public async getCharacterSkills(characterId: string) {
    const results = await this.db
      .select()
      .from(characterSkills)
      .where(eq(characterSkills.characterId, characterId))
      .execute()
    return results.map((result) => CharacterSkill(result))
  }

  public async createCharacterSkill(data: Partial<CharacterSkillData>) {
    return this.create(data)
  }

  public async updateCharacterSkill(data: Partial<CharacterSkillData>) {
    if (!data.characterId || !data.skillId) return null

    const [updated] = (await this.db
      .update(characterSkills)
      .set(data)
      .where(
        and(
          eq(characterSkills.characterId, data.characterId),
          eq(characterSkills.skillId, data.skillId)
        )
      )
      .returning()) as any[]

    return updated ? CharacterSkill(updated) : null
  }

  public async deleteCharacterSkill(id: string) {
    return this.delete(id)
  }
}
