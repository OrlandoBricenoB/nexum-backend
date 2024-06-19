import { eq } from 'drizzle-orm'
import {
  CharacterSkill,
  CharacterSkillData,
} from '../../shared/domain/entities/characters/skills/CharacterSkill'
import { characterSkills } from '../../shared/domain/schemas/characters/skills/characterSkills'
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
    if (!data.id) return null
    return this.update(data.id, data)
  }

  public async deleteCharacterSkill(id: string) {
    return this.delete(id)
  }
}
