import { Request, Response } from 'express'
import { CharacterService } from '../services/characterService'
import { Character } from '../domain/character'
import { v4 as uuidv4 } from 'uuid'
import { NotFound } from '../../shared/errors/customErrors'
import { ControllerBase } from '../../shared/domain/controllerBase'

export class CharacterController extends ControllerBase {
  private characterService: CharacterService

  constructor() {
    super()

    this.characterService = new CharacterService()
  }

  public async getAllCharacters(req: Request, res: Response): Promise<void> {
    const characters = await this.characterService.getAllCharacters()

    res.json(characters)
  }

  public async getCharacter(req: Request, res: Response): Promise<void> {
    const id = req.params.id

    const character = await this.characterService.getCharacter(id)

    if (character) {
      res.json(character)
    } else {
      const notFoundError = new NotFound('CHARACTER_NOT_FOUND')
      res.status(notFoundError.status).send({ error: notFoundError })
    }
  }

  public async createCharacter(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as Partial<Character>

      const validData = Character.create({
        ...data,
        id: uuidv4()
      }) as Character

      await this.characterService.createCharacter(validData)
      res.json(validData)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}
