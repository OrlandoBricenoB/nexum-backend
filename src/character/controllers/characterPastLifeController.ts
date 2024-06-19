import { ControllerBase } from '../../shared/domain/controllerBase'
import { CharacterPastLifeService } from '../services/characterPastLifeService'
import { NotFound } from '../../shared/errors/customErrors'
import { HonoContext } from '../../server/types/HonoContext'

export class CharacterPastLifeController extends ControllerBase {
  private characterPastLifeService: CharacterPastLifeService

  constructor() {
    super()

    this.characterPastLifeService = new CharacterPastLifeService()
  }

  public async getAllCharacterPastLifes(ctx: HonoContext<'/'>) {
    const characterId = ctx.get('characterId')

    const characterPastLifes =
      await this.characterPastLifeService.getAllCharacterPastLifes(characterId)

    return ctx.json(characterPastLifes.map((pastLife) => pastLife.getInfo()))
  }

  public async getCharacterPastLife(ctx: HonoContext<'/:id'>) {
    const id = ctx.req.param('id')

    const characterPastLife = await this.characterPastLifeService.getCharacterPastLife(id)

    if (characterPastLife) {
      return ctx.json(characterPastLife.getInfo())
    } else {
      const notFoundError = new NotFound('CHARACTER_PAST_LIFE_NOT_FOUND')
      return ctx.json(
        {
          error: notFoundError,
        },
        notFoundError.status
      )
    }
  }
}
