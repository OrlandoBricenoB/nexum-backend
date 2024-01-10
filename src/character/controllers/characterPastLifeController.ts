import { Request, Response } from 'express'
import { ControllerBase } from '../../shared/domain/controllerBase'
import { CharacterPastLifeService } from '../services/characterPastLifeService'
import { NotFound } from '../../shared/errors/customErrors'

export class CharacterPastLifeController extends ControllerBase {
  private characterPastLifeService: CharacterPastLifeService

  constructor() {
    super()

    this.characterPastLifeService = new CharacterPastLifeService()
  }

  public async getAllCharacterPastLifes(req: Request, res: Response): Promise<void> {
    const { character_id } = req.body as { character_id: string }

    const characterPastLifes = await this.characterPastLifeService.getAllCharacterPastLifes(character_id)

    res.json(characterPastLifes)
  }

  public async getCharacterPastLife(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    const characterPastLife = await this.characterPastLifeService.getCharacterPastLife(id)

    if (characterPastLife) {
      res.json(characterPastLife)
    } else {
      const notFoundError = new NotFound('CHARACTER_PAST_LIFE_NOT_FOUND')
      res.status(notFoundError.status).send({ error: notFoundError })
    }
  }
}
