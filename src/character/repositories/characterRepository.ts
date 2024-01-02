import { RepositoryBase } from '../../shared/domain/repositoryBase'
import { Character } from '../domain/character'

export class CharacterRepository extends RepositoryBase<Character> {
  constructor() {
    super('characters')
  }

  public async getAllCharacters(): Promise<Character[]> {
    return this.getAll()
  }

  public async getCharacter(id: string): Promise<Character | null> {
    return this.getById(id)
  }

  public async createCharacter(data: Partial<Character>) {
    return this.create(data)
  }
}
