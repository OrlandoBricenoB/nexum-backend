import { CharacterSkillData } from '../../shared/domain/entities/characters/skills/CharacterSkill'
import { EntitiesReturnType } from '../../shared/types/Entities'
import { CharacterSkillsRepository } from '../repositories/characterSkillRepository'

export class CharacterSkillsService {
  private characterSkillRepository: CharacterSkillsRepository

  constructor() {
    this.characterSkillRepository = new CharacterSkillsRepository()
  }

  public async getCharacterSkill(characterId: string) {
    const skills = await this.characterSkillRepository.getCharacterSkills(characterId)
    return skills as unknown as Array<EntitiesReturnType['CharacterSkill']>
  }

  public async createCharacterSkill(data: Partial<CharacterSkillData>) {
    return this.characterSkillRepository.createCharacterSkill(
      data
    ) as unknown as EntitiesReturnType['CharacterSkill']
  }

  public async updateCharacterSkill(data: Partial<CharacterSkillData>) {
    const stats = await this.characterSkillRepository.updateCharacterSkill(data)
    return stats as unknown as EntitiesReturnType['CharacterSkill']
  }

  public async deleteCharacterSkill(id: string) {
    return this.characterSkillRepository.deleteCharacterSkill(id)
  }
}
