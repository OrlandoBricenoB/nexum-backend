import { isEmpty } from 'lodash'
import { CharacterData } from '../../shared/domain/entities/characters/Character'
import { EntitiesReturnType } from '../../shared/types/Entities'
import { CharacterRepository } from '../repositories/characterRepository'

export class CharacterService {
  private characterRepository: CharacterRepository

  constructor() {
    this.characterRepository = new CharacterRepository()
  }

  public async getAllCharacters() {
    const characters = await this.characterRepository.getAllCharacters()
    return characters as unknown as Array<EntitiesReturnType['Character']>
  }

  public async getCharacter(id: string) {
    const character = await this.characterRepository.getCharacter(id)
    return character as EntitiesReturnType['Character']
  }

  public async createCharacter(data: Partial<CharacterData>) {
    return this.characterRepository.createCharacter(
      data
    ) as unknown as EntitiesReturnType['Character']
  }

  public async updateCharacter(data: Partial<CharacterData>) {
    const character = await this.characterRepository.updateCharacter(data)
    return character as EntitiesReturnType['Character']
  }

  public async getAllAccountCharacters(accountId: string) {
    const allAccountCharacters = await this.characterRepository.getAllAccountCharacters(accountId)
    return allAccountCharacters as Array<EntitiesReturnType['Character']>
  }

  public async deleteCharacter(id: string) {
    return this.characterRepository.deleteCharacter(id)
  }

  public async existsCharacter(id: string) {
    const character = this.characterRepository.getCharacter(id)
    return !isEmpty(character)
  }

  public async getDuplicatedFields(character: EntitiesReturnType['Character']) {
    const duplicated = await this.characterRepository.getDuplicatedFields(character)
    return duplicated
  }
}
