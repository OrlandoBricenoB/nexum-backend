import { CharacterItemData } from '../../shared/domain/entities/characters/inventory/CharacterItem'
import { Database } from '../../shared/types/Database'
import { EntitiesReturnType } from '../../shared/types/Entities'
import { CharacterItemsRepository } from '../repositories/characterItemRepository'

export const CharacterItemsService = (db: Database) => {
  const characterItemsRepository = new CharacterItemsRepository(db)

  const getCharacterItems = async (characterId: string) => {
    const items = await characterItemsRepository.getCharacterItems(characterId)
    return items as unknown as Array<EntitiesReturnType['CharacterItem']>
  }

  const createCharacterItem = async (data: Partial<CharacterItemData>) => {
    const item = await characterItemsRepository.createCharacterItem(data)
    return item as EntitiesReturnType['CharacterItem']
  }

  const updateCharacterItem = async (data: Partial<CharacterItemData>) => {
    const stats = await characterItemsRepository.updateCharacterItem(data)
    return stats as EntitiesReturnType['CharacterItem']
  }

  const deleteCharacterItem = async (id: string) => {
    return characterItemsRepository.deleteCharacterItem(id)
  }

  return {
    getCharacterItems,
    createCharacterItem,
    updateCharacterItem,
    deleteCharacterItem,
  }
}
