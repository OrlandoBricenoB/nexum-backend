import { Request, Response } from 'express'
import { ControllerBase } from '../../shared/domain/controllerBase'
import { CharacterPastLifeService } from '../services/characterPastLifeService'
import { pick } from 'lodash'
import { CharacterPastLife } from '../domain/characterPastLife'
import { NotFound } from '../../shared/errors/customErrors'

export class CharacterPastLifeController extends ControllerBase {
  private characterPastLifeService: CharacterPastLifeService

  constructor() {
    super()

    this.characterPastLifeService = new CharacterPastLifeService()
  }

  public async getAllCharacterPastLifes(req: Request, res: Response): Promise<void> {
    const { _character_id } = req.body as { _character_id: string }

    const characterPastLifes = await this.characterPastLifeService.getAllCharacterPastLifes(_character_id)

    res.json(characterPastLifes.map(pastLife => pick(pastLife, CharacterPastLife.fields)))
  }

  public async getCharacterPastLife(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    const characterPastLife = await this.characterPastLifeService.getCharacterPastLife(id)

    if (characterPastLife) {
      res.json(pick(characterPastLife, CharacterPastLife.fields))
    } else {
      const notFoundError = new NotFound('CHARACTER_PAST_LIFE_NOT_FOUND')
      res.status(notFoundError.status).send({ error: notFoundError })
    }
  }
}
