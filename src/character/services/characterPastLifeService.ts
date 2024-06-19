import { CharacterPastLifeData } from '../../shared/domain/entities/CharacterPastLife'
import { Database } from '../../shared/types/Database'
import { EntitiesReturnType } from '../../shared/types/Entities'
import { CharacterPastLifeRepository } from '../repositories/characterPastLifeRepository'

export const CharacterPastLifeService = (db: Database) => {
  const characterPastLifeRepository = new CharacterPastLifeRepository(db)

  const getAllCharacterPastLifes = async (characterId: string) => {
    const allCharactersPastLifes =
      await characterPastLifeRepository.getAllCharacterPastLifes(characterId)
    return allCharactersPastLifes as Array<EntitiesReturnType['CharacterPastLife']>
  }

  const getCharacterPastLife = async (id: string) => {
    const characterPastLife = await characterPastLifeRepository.getCharacterPastLife(id)
    return characterPastLife as EntitiesReturnType['CharacterPastLife']
  }

  const createCharacterPastLife = async (data: Partial<CharacterPastLifeData>) => {
    const pastLife = await characterPastLifeRepository.createCharacterPastLife(data)
    return pastLife as EntitiesReturnType['CharacterPastLife']
  }

  return {
    getAllCharacterPastLifes,
    getCharacterPastLife,
    createCharacterPastLife,
  }
}
