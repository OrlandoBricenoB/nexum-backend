import { ControllerBase } from '../../shared/domain/controllerBase'
import { CharacterPastLifeService } from '../services/characterPastLifeService'
import { NotFound } from '../../shared/errors/customErrors'
import { HonoContext } from '../../server/types/HonoContext'
import { connect } from '../../config/databaseConfig'

export class CharacterPastLifeController extends ControllerBase {
  constructor() {
    super()
  }

  public async getAllCharacterPastLifes(ctx: HonoContext<'/'>) {
    const characterId = ctx.get('characterId')

    const db = await connect(ctx.env.DATABASE_URL)

    const characterPastLifes =
      await CharacterPastLifeService(db).getAllCharacterPastLifes(characterId)

    return ctx.json(characterPastLifes.map((pastLife) => pastLife.getInfo()))
  }

  public async getCharacterPastLife(ctx: HonoContext<'/:id'>) {
    const id = ctx.req.param('id')

    const db = await connect(ctx.env.DATABASE_URL)
    const characterPastLife = await CharacterPastLifeService(db).getCharacterPastLife(id)

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
