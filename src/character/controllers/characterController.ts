import { Request, Response } from 'express'
import { CharacterService } from '../services/characterService'
import { Character } from '../domain/character'
import { NotFound } from '../../shared/errors/customErrors'
import { ControllerBase } from '../../shared/domain/controllerBase'
import { Account } from '../../account/domain/account'

export class CharacterController extends ControllerBase {
  private characterService: CharacterService

  constructor() {
    super()

    this.characterService = new CharacterService()
  }

  public async getAllCharacters(req: Request, res: Response): Promise<void> {
    const characters = await this.characterService.getAllCharacters()

    res.json(characters.map(character => character.getInfo()))
  }

  public async getCharacter(req: Request, res: Response): Promise<void> {
    const id = req.params.id

    const character = await this.characterService.getCharacter(id)

    if (character) {
      res.json(character.getInfo())
    } else {
      const notFoundError = new NotFound('CHARACTER_NOT_FOUND')
      res.status(notFoundError.status).send({ error: notFoundError })
    }
  }

  public async createCharacter(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as Partial<Character>

      const character = Character.create(data) as Character
      character.new()

      await this.characterService.createCharacter(character)
      res.json(character.getInfo())
    } catch (error) {
      res.status(500).json(error)
    }
  }

  public async getCharactersByAccount(req: Request, res: Response): Promise<void> {
    const { _account } = req.body as { _account: Account }

    const characters = await this.characterService.getAllAccountCharacters(_account.id!)

    res.json(characters.map(character => character.getInfo()))
  }
}
