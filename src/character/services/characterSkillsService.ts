import { CharacterSkillData } from '../../shared/domain/entities/characters/skills/CharacterSkill'
import { Database } from '../../shared/types/Database'
import { EntitiesReturnType } from '../../shared/types/Entities'
import { CharacterSkillsRepository } from '../repositories/characterSkillRepository'

export const CharacterSkillsService = (db: Database) => {
  const characterSkillsRepository = new CharacterSkillsRepository(db)

  const getCharacterSkills = async (characterId: string) => {
    const skills = await characterSkillsRepository.getCharacterSkills(characterId)
    return skills as Array<EntitiesReturnType['CharacterSkill']>
  }

  const createCharacterSkill = async (data: Partial<CharacterSkillData>) => {
    const skill = await characterSkillsRepository.createCharacterSkill(data)
    return skill as EntitiesReturnType['CharacterSkill']
  }

  const updateCharacterSkill = async (data: Partial<CharacterSkillData>) => {
    const updatedSkill = await characterSkillsRepository.updateCharacterSkill(data)
    return updatedSkill as EntitiesReturnType['CharacterSkill']
  }

  const deleteCharacterSkill = async (id: string) => {
    return characterSkillsRepository.deleteCharacterSkill(id)
  }

  return {
    getCharacterSkills,
    createCharacterSkill,
    updateCharacterSkill,
    deleteCharacterSkill,
  }
}
