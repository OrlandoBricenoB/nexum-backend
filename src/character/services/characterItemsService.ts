import { CharacterItemData } from '../../shared/domain/entities/characters/inventory/CharacterItem'
import { EntitiesReturnType } from '../../shared/types/Entities'
import { CharacterItemsRepository } from '../repositories/characterItemRepository'

export class CharacterItemsService {
  private characterItemsRepository: CharacterItemsRepository

  constructor() {
    this.characterItemsRepository = new CharacterItemsRepository()
  }

  public async getCharacterItems(characterId: string) {
    const skills = await this.characterItemsRepository.getCharacterItems(characterId)
    return skills as unknown as Array<EntitiesReturnType['CharacterItem']>
  }

  public async createCharacterItem(data: Partial<CharacterItemData>) {
    return this.characterItemsRepository.createCharacterItem(
      data
    ) as unknown as EntitiesReturnType['CharacterItem']
  }

  public async updateCharacterItem(data: Partial<CharacterItemData>) {
    const stats = await this.characterItemsRepository.updateCharacterItem(data)
    return stats as unknown as EntitiesReturnType['CharacterItem']
  }

  public async deleteCharacterItem(id: string) {
    return this.characterItemsRepository.deleteCharacterItem(id)
  }
}
