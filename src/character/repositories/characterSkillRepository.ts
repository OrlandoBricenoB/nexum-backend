import { eq } from 'drizzle-orm'
import { database } from '../../config/databaseConfig'
import {
  CharacterSkill,
  CharacterSkillData,
} from '../../shared/domain/entities/characters/skills/CharacterSkill'
import { characterSkills } from '../../shared/domain/schemas/characters/skills/characterSkills'
import { RepositoryBase } from '../../shared/repositories/repositoryBase'

export class CharacterSkillsRepository extends RepositoryBase<'CharacterSkill'> {
  constructor() {
    super(characterSkills, CharacterSkill)
  }

  public async getCharacterSkills(characterId: string) {
    const results = await database
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
