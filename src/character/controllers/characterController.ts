import { CharacterService } from '../services/characterService'
import { BadRequest, DuplicatedError, NotFound } from '../../shared/errors/customErrors'
import { ControllerBase } from '../../shared/domain/controllerBase'
import { CharacterStatsService } from '../services/characterStatsService'
import { CharacterHealthStatsService } from '../services/characterHealthStatsService'
import { CharacterMurderStatsService } from '../services/characterMurderStatsService'
import { CharacterWalletService } from '../services/characterWalletService'
import { CharacterAppearanceService } from '../services/characterAppearanceService'
import { KINGDOMS_FROM_CLANS } from '../../shared/domain/Kingdoms'
import { HonoContext } from '../../server/types/HonoContext'
import { Character, CharacterData } from '../../shared/domain/entities/characters/Character'
import {
  CharacterAppearance,
  CharacterAppearanceData,
} from '../../shared/domain/entities/characters/CharacterAppearance'
import {
  CharacterStats,
  CharacterStatsData,
} from '../../shared/domain/entities/characters/stats/CharacterStats'
import {
  CharacterHealthStats,
  CharacterHealthStatsData,
} from '../../shared/domain/entities/characters/stats/CharacterHealthStats'
import {
  CharacterMurderStats,
  CharacterMurderStatsData,
} from '../../shared/domain/entities/characters/stats/CharacterMurderStats'
import {
  CharacterWallet,
  CharacterWalletData,
} from '../../shared/domain/entities/characters/inventory/CharacterWallet'
import { connect } from '../../config/databaseConfig'
import { AccountSessionService } from '../../account/services/accountSessionService'
import {
  characterAppearances,
  characterHealthStats,
  characterInventorySlots,
  characterItems,
  characterMurderStats,
  characterSkills,
  characterStats,
  characterWallets,
  characters,
} from '../../shared/domain/domains'
import { eq } from 'drizzle-orm'
import { characterLocations } from '../../shared/domain/schemas/characters/location/characterLocations'

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
    const { full } = ctx.req.query()

    const db = await connect(ctx.env.DATABASE_URL)

    const characterService = CharacterService(db)
    const characterAppearanceService = CharacterAppearanceService(db)
    const characterStatsService = CharacterStatsService(db)
    const characterHealthStatsService = CharacterHealthStatsService(db)
    const characterMurderStatsService = CharacterMurderStatsService(db)
    const characterWalletService = CharacterWalletService(db)

    // TODO: El sql de getCharacters debe traer todas las tablas correspondientes.
    // TODO: Si tiene el query full, dará todo, sino, solo apariencia y data principal de character.
    const character = await characterService.getCharacter(id)

    if (character) {
      const appearance = await characterAppearanceService.getCharacterAppearance(id)
      let data: Partial<CharacterData> & {
        appearance: Partial<CharacterAppearanceData>
        stats?: Partial<CharacterStatsData>
        healthStats?: Partial<CharacterHealthStatsData>
        murderStats?: Partial<CharacterMurderStatsData>
        wallet?: Partial<CharacterWalletData>
      } = {
        ...character.getInfo(),
        appearance: appearance.getInfo(),
      }

      if (full) {
        const stats = await characterStatsService.getCharacterStats(id)
        const healthStats = await characterHealthStatsService.getCharacterHealthStats(id)
        const murderStats = await characterMurderStatsService.getCharacterMurderStats(id)
        const wallet = await characterWalletService.getCharacterWallet(id)
        data = {
          ...data,
          stats,
          healthStats,
          murderStats,
          wallet,
        }
      }

      return ctx.json({
        character: data,
      })
    } else {
      const notFoundError = new NotFound('CHARACTER_NOT_FOUND')
      return ctx.json(
        {
          error: notFoundError,
        },
        notFoundError.status
      )
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
      return ctx.json(
        {
          error: badRequestError,
        },
        badRequestError.status
      )
    }

    const [character] = await db
      .select({
        data: {
          ...characters,
          appearance: {
            skinTone: characterAppearances.skinTone,
            hairstyle: characterAppearances.hairstyle,
            facestyle: characterAppearances.facestyle,
            gender: characterAppearances.gender,
          },
          location: {
            region: characterLocations.region,
            positionX: characterLocations.positionX,
            positionY: characterLocations.positionY,
          },
          stats: {
            level: characterStats.level,
            exp: characterStats.exp,
            rebirths: characterStats.rebirths,
            skillPoints: characterStats.skillPoints,
            elementPoints: characterStats.elementPoints,
            rebirthPoints: characterStats.rebirthPoints,
            rank: characterStats.rank,

            honor: characterMurderStats.honor,
            kills: characterMurderStats.kills,
            deaths: characterMurderStats.deaths,
            deathCount: characterMurderStats.deathCount,

            vitality: characterHealthStats.vitality,
            stamina: characterHealthStats.stamina,
            mana: characterHealthStats.mana,
            manaReserve: characterHealthStats.manaReserve,
          },
          wallet: {
            hesedias: characterWallets.hesedias,
            nexumCoins: characterWallets.nexumCoins,
          },
        },
      })
      .from(characters)
      .where(eq(characters.id, characterId))
      .leftJoin(characterAppearances, eq(characterAppearances.characterId, characterId))
      .leftJoin(characterLocations, eq(characterLocations.characterId, characterId))
      .leftJoin(characterStats, eq(characterStats.characterId, characterId))
      .leftJoin(characterHealthStats, eq(characterHealthStats.characterId, characterId))
      .leftJoin(characterMurderStats, eq(characterMurderStats.characterId, characterId))
      .leftJoin(characterWallets, eq(characterWallets.characterId, characterId))
      .execute()

    // * Load many to 1 separated
    const items = await db
      .select({
        itemId: characterItems.itemId,
        level: characterItems.level,
        quality: characterItems.quality,
      })
      .from(characterItems)
      .where(eq(characterItems.characterId, characterId))
      .execute()

    const inventorySlots = await db
      .select({
        inventory: characterInventorySlots.inventory,
        slot: characterInventorySlots.slot,
        stack: characterInventorySlots.stack,
        characterItemId: characterInventorySlots.characterItemId,
      })
      .from(characterInventorySlots)
      .where(eq(characterInventorySlots.characterId, characterId))
      .execute()

    const skills = await db
      .select({
        level: characterSkills.level,
        points: characterSkills.points,
        skillId: characterSkills.skillId,
      })
      .from(characterSkills)
      .where(eq(characterSkills.characterId, characterId))
      .execute()

    if (character) {
      return ctx.json({
        character: {
          ...character.data,
          skills,
          items,
          inventorySlots,
        },
      })
    } else {
      const notFoundError = new NotFound('CHARACTER_NOT_FOUND')
      return ctx.json(
        {
          error: notFoundError,
        },
        notFoundError.status
      )
    }
  }

  public async createCharacter(ctx: HonoContext<'/create'>) {
    try {
      const { character: data, appearance } = (await ctx.req.json()) as {
        character: Pick<CharacterData, 'name' | 'clan' | 'slot'>
        appearance: Partial<CharacterAppearanceData>
      }

      const accountId = ctx.get('accountId')

      const character = Character(data)
      character.accountId = accountId
      character.kingdom = KINGDOMS_FROM_CLANS[character.clan as 'omnivisus']
      character.division = character.division || ''
      character.profession = character.profession || ''

      if (!character.isComplete()) {
        console.log('Is not complete')
        const error = new BadRequest()
        return ctx.json(
          {
            error,
          },
          error.status
        )
      }

      const db = await connect(ctx.env.DATABASE_URL)
      const characterService = CharacterService(db)
      const characterAppearanceService = CharacterAppearanceService(db)
      const characterStatsService = CharacterStatsService(db)
      const characterHealthStatsService = CharacterHealthStatsService(db)
      const characterMurderStatsService = CharacterMurderStatsService(db)
      const characterWalletService = CharacterWalletService(db)

      const duplicated = await characterService.getDuplicatedFields(character)
      if (duplicated.length > 0) {
        const error = new DuplicatedError(duplicated)
        return ctx.json(
          {
            error,
          },
          error.status
        )
      }

      // * Default values for character
      const stats = CharacterStats({
        level: 1,
        exp: 0,
        rebirths: 0,
        skillPoints: 0,
        elementPoints: 0,
        rebirthPoints: 0,
        rank: '',
      })

      const healthStats = CharacterHealthStats({
        vitality: '0.00',
        stamina: '0.00',
        mana: '0.00',
        manaReserve: '0.00',
      })

      const murderStats = CharacterMurderStats({
        honor: 0,
        deathCount: '0.00',
        kills: 0,
        deaths: 0,
        assists: 0,
      })

      const charAppearance = CharacterAppearance({
        skinTone: appearance.skinTone,
        hairstyle: appearance.hairstyle,
        facestyle: appearance.facestyle,
        gender: appearance.gender,
      })

      const wallet = CharacterWallet({
        hesedias: 50,
        nexumCoins: 0,
      })

      // * Create data
      const createdCharacter = await characterService.createCharacter(character)
      console.log('createdCharacter', JSON.stringify(createdCharacter.getInfo()))
      const createdCharacterStats = await characterStatsService.createCharacterStats({
        ...stats,
        characterId: createdCharacter.id,
      })
      await characterHealthStatsService.createCharacterHealthStats({
        ...healthStats,
        characterId: createdCharacter.id,
      })
      await characterMurderStatsService.createCharacterMurderStats({
        ...murderStats,
        characterId: createdCharacter.id,
      })
      await characterAppearanceService.createCharacterAppearance({
        ...charAppearance,
        characterId: createdCharacter.id,
      })
      await characterWalletService.createCharacterWallet({
        ...wallet,
        characterId: createdCharacter.id,
      })

      console.log('Created', JSON.stringify(createdCharacter.getInfo()))

      return ctx.json({
        character: {
          ...createdCharacter.getInfo(),
          stats: createdCharacterStats.getInfo(),
        },
      })
    } catch (error) {
      console.log(error)
      return ctx.json(
        {
          error,
        },
        500
      )
    }
  }

  public async getCharactersByAccount(ctx: HonoContext<'/getAllByAccount'>) {
    const accountId = ctx.get('accountId')

    const db = await connect(ctx.env.DATABASE_URL)
    const characterService = CharacterService(db)
    const characterStatsService = CharacterStatsService(db)

    const characters = await characterService.getAllAccountCharacters(accountId)
    const charactersData: Array<
      Partial<CharacterData> & {
        stats: Partial<CharacterStatsData>
      }
    > = []
    for (let i = 0; i < characters.length; i++) {
      const character = characters[i]
      if (!character || !character.id) continue

      const stats = await characterStatsService.getCharacterStats(character.id)
      charactersData.push({
        ...character.getInfo(),
        stats: stats.getInfo(),
      })
    }

    return ctx.json({ characters: charactersData })
  }

  public async deleteCharacter(ctx: HonoContext<'/delete/:id'>) {
    const characterId = ctx.req.param('id')

    const db = await connect(ctx.env.DATABASE_URL)
    const characterService = CharacterService(db)

    const existsCharacter = await characterService.existsCharacter(characterId)

    if (!existsCharacter) {
      const error = new NotFound('CHARACTER_NOT_FOUND')

      return ctx.json(
        {
          error,
        },
        error.status
      )
    }

    await characterService.deleteCharacter(characterId)

    return ctx.json({
      ok: true,
      message: 'Character deleted succesfully',
    })
  }
}
