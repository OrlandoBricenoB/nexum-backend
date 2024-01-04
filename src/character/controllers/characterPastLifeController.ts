import { Request, Response } from 'express'
import { ControllerBase } from '../../shared/domain/controllerBase'
import { CharacterPastLifeService } from '../services/characterPastLifeService'
import { pick } from 'lodash'
import { CharacterPastLife } from '../domain/characterPastLife'

export class CharacterPastLifeController extends ControllerBase {
  private characterPastLifeService: CharacterPastLifeService

  constructor() {
    super()

    this.characterPastLifeService = new CharacterPastLifeService()
  }

  public async getAllCharacterPastLifes(req: Request, res: Response): Promise<void> {
    const { character_id } = req.body as { character_id: string }

    const characterPastLifes = await this.characterPastLifeService.getAllCharacterPastLifes(character_id)

    res.json(characterPastLifes.map(pastLife => pick(pastLife, CharacterPastLife.fields)))
  }
}
