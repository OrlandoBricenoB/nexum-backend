import { CharacterSkill } from '../domain/characterSkill'
import { CharacterSkillsRepository } from '../repositories/characterSkillRepository'

export class CharacterSkillsService {
  private characterSkillRepository: CharacterSkillsRepository

  constructor() {
    this.characterSkillRepository = new CharacterSkillsRepository()
  }

  public async getCharacterWallet(characterId: string): Promise<CharacterSkill[]> {
    const skills = await this.characterSkillRepository.getCharacterSkills(characterId)
    return skills.map(skill => CharacterSkill.create(skill)) as CharacterSkill[]
  }

  public async createCharacterSkill(data: Partial<CharacterSkill>): Promise<boolean> {
    return this.characterSkillRepository.createCharacterSkill(data)
  }

  public async updateCharacterSkill(data: Partial<CharacterSkill>): Promise<CharacterSkill | null> {
    const stats = await this.characterSkillRepository.updateCharacterSkill(data)
    return stats
  }

  public async deleteCharacterSkill(id: string): Promise<boolean> {
    return this.characterSkillRepository.deleteCharacterSkill(id)
  }
}
