import { RepositoryBase } from '../../shared/repositories/repositoryBase'
import { CharacterSkill } from '../domain/characterSkill'

export class CharacterSkillsRepository extends RepositoryBase<CharacterSkill> {
  constructor() {
    super('character_skills')
  }

  public async getCharacterSkills(characterId: string): Promise<CharacterSkill[]> {
    return this.getAll({
      character_id: characterId
    })
  }

  public async createCharacterSkill(data: Partial<CharacterSkill>): Promise<boolean> {
    return this.create(data)
  }

  public async updateCharacterSkill(data: Partial<CharacterSkill>): Promise<CharacterSkill | null> {
    if (!data.id) return null
    return this.update(data.id, data)
  }

  public async deleteCharacterSkill(id: string): Promise<boolean> {
    return this.delete(id)
  }
}
