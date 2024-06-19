import { isEmpty } from 'lodash'
import { CharacterData } from '../../shared/domain/entities/characters/Character'
import { EntitiesReturnType } from '../../shared/types/Entities'
import { CharacterRepository } from '../repositories/characterRepository'
import { Database } from '../../shared/types/Database'

export const CharacterService = (db: Database) => {
  const characterRepository = new CharacterRepository(db)

  const getAllCharacters = async () => {
    const characters = await characterRepository.getAllCharacters()
    return characters as Array<EntitiesReturnType['Character']>
  }

  const getCharacter = async (id: string) => {
    const character = await characterRepository.getCharacter(id)
    return character as EntitiesReturnType['Character']
  }

  const createCharacter = async (data: Partial<CharacterData>) => {
    const character = await characterRepository.createCharacter(data)
    return character as EntitiesReturnType['Character']
  }

  const updateCharacter = async (data: Partial<CharacterData>) => {
    const character = await characterRepository.updateCharacter(data)
    return character as EntitiesReturnType['Character']
  }

  const getAllAccountCharacters = async (accountId: string) => {
    const allAccountCharacters = await characterRepository.getAllAccountCharacters(accountId)
    return allAccountCharacters as Array<EntitiesReturnType['Character']>
  }

  const deleteCharacter = async (id: string) => {
    return characterRepository.deleteCharacter(id)
  }

  const existsCharacter = async (id: string) => {
    const character = await characterRepository.getCharacter(id)
    return !isEmpty(character)
  }

  const getDuplicatedFields = async (character: EntitiesReturnType['Character']) => {
    const duplicated = await characterRepository.getDuplicatedFields(character)
    return duplicated
  }

  return {
    getAllCharacters,
    getCharacter,
    createCharacter,
    updateCharacter,
    getAllAccountCharacters,
    deleteCharacter,
    existsCharacter,
    getDuplicatedFields,
  }
}
