import { CharacterService } from '../services/characterService'
import { BadRequest, DuplicatedError, NotFound } from '../../shared/errors/customErrors'
import { ControllerBase } from '../../shared/domain/controllerBase'
import { KINGDOMS_FROM_CLANS } from '../../shared/domain/Kingdoms'
import { HonoContext } from '../../server/types/HonoContext'
import { Character, CharacterData } from '../../shared/domain/entities/characters/Character'
import { connect } from '../../config/databaseConfig'
import { AccountSessionService } from '../../account/services/accountSessionService'
import { characterInventoryItems, characterSkills, characters } from '../../shared/domain/domains'
import { eq } from 'drizzle-orm'
export class CharacterController extends ControllerBase {
  constructor() {
    super()
  }

  public async getAllCharacters(ctx: HonoContext<'/'>) {
    const db = await connect(ctx.env.DATABASE_URL)
    const characters = await CharacterService(db).getAllCharacters()
    return ctx.json({
      characters: characters.map((character) => character.getInfo()),
    })
  }

  public async getCharacter(ctx: HonoContext<'/:id'>) {
    const id = ctx.req.param('id')
    const db = await connect(ctx.env.DATABASE_URL)
    const characterService = CharacterService(db)

    const character = await characterService.getCharacter(id)

    if (character) {
      return ctx.json({
        character: character.getInfo(),
      })
    } else {
      const notFoundError = new NotFound('CHARACTER_NOT_FOUND')
      return ctx.json({ error: notFoundError }, notFoundError.status)
    }
  }

  public async getCharacterSession(ctx: HonoContext<'/session'>) {
    const sessionId = ctx.get('sessionId')

    const db = await connect(ctx.env.DATABASE_URL)
    const sessionService = AccountSessionService(db)
    const session = await sessionService.getSession(sessionId)
    const characterId = session.characterId || ''

    if (!characterId) {
      console.log('CharacterId is empty')
      const badRequestError = new BadRequest()
      return ctx.json({ error: badRequestError }, badRequestError.status)
    }

    const [character] = await db
      .select()
      .from(characters)
      .where(eq(characters.id, characterId))
      .execute()

    const inventorySlots = await db
      .select({
        inventory: characterInventoryItems.inventory,
        slot: characterInventoryItems.slot,
        stack: characterInventoryItems.stack,
        itemId: characterInventoryItems.itemId,
      })
      .from(characterInventoryItems)
      .where(eq(characterInventoryItems.characterId, characterId))
      .execute()

    const skills = await db
      .select({
        skillLevel: characterSkills.skillLevel,
        skillId: characterSkills.skillId,
      })
      .from(characterSkills)
      .where(eq(characterSkills.characterId, characterId))
      .execute()

    if (character) {
      return ctx.json({
        character: {
          ...character,
          skills,
          inventorySlots,
        },
      })
    } else {
      const notFoundError = new NotFound('CHARACTER_NOT_FOUND')
      return ctx.json({ error: notFoundError }, notFoundError.status)
    }
  }

  public async createCharacter(ctx: HonoContext<'/create'>) {
    try {
      const { character: data, appearance } = (await ctx.req.json()) as {
        character: Pick<CharacterData, 'name' | 'clan' | 'slot'>
        appearance: any
      }

      const accountId = ctx.get('accountId')

      const characterData = {
        ...data,
        ...appearance,
        accountId,
        kingdom: KINGDOMS_FROM_CLANS[data.clan as 'omnivisus'],
      }

      const character = Character(characterData)

      if (!character.isComplete()) {
        const error = new BadRequest()
        return ctx.json({ error }, error.status)
      }

      const db = await connect(ctx.env.DATABASE_URL)
      const characterService = CharacterService(db)

      const duplicated = await characterService.getDuplicatedFields(character)
      if (duplicated.length > 0) {
        const error = new DuplicatedError(duplicated)
        return ctx.json({ error }, error.status)
      }

      const createdCharacter = await characterService.createCharacter(character)

      return ctx.json({
        character: createdCharacter.getInfo(),
      })
    } catch (error) {
      console.log(error)
      return ctx.json({ error }, 500)
    }
  }

  public async getCharactersByAccount(ctx: HonoContext<'/getAllByAccount'>) {
    const accountId = ctx.get('accountId')

    const db = await connect(ctx.env.DATABASE_URL)
    const characterService = CharacterService(db)

    const characters = await characterService.getAllAccountCharacters(accountId)
    const charactersData = characters.map((c) => c.getInfo())

    return ctx.json({ characters: charactersData })
  }

  public async deleteCharacter(ctx: HonoContext<'/delete/:id'>) {
    const characterId = ctx.req.param('id')

    const db = await connect(ctx.env.DATABASE_URL)
    const characterService = CharacterService(db)

    const existsCharacter = await characterService.existsCharacter(characterId)

    if (!existsCharacter) {
      const error = new NotFound('CHARACTER_NOT_FOUND')
      return ctx.json({ error }, error.status)
    }

    await characterService.deleteCharacter(characterId)

    return ctx.json({
      ok: true,
      message: 'Character deleted succesfully',
    })
  }
}
