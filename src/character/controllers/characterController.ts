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
import { AccountData } from '../../shared/domain/entities/accounts/Account'
import { CharacterStats } from '../../shared/domain/entities/characters/stats/CharacterStats'
import { CharacterHealthStats } from '../../shared/domain/entities/characters/stats/CharacterHealthStats'
import { CharacterMurderStats } from '../../shared/domain/entities/characters/stats/CharacterMurderStats'
import { CharacterWallet } from '../../shared/domain/entities/characters/inventory/CharacterWallet'

export class CharacterController extends ControllerBase {
  private characterService: CharacterService
  private characterStatsService: CharacterStatsService
  private characterHealthStatsService: CharacterHealthStatsService
  private characterMurderStatsService: CharacterMurderStatsService
  private characterAppearanceService: CharacterAppearanceService
  private characterWalletService: CharacterWalletService

  constructor() {
    super()

    this.characterService = new CharacterService()
    this.characterStatsService = new CharacterStatsService()
    this.characterHealthStatsService = new CharacterHealthStatsService()
    this.characterMurderStatsService = new CharacterMurderStatsService()
    this.characterAppearanceService = new CharacterAppearanceService()
    this.characterWalletService = new CharacterWalletService()
  }

  public async getAllCharacters(ctx: HonoContext<'/'>) {
    const characters = await this.characterService.getAllCharacters()
    return ctx.json(characters.map((character) => character.getInfo()))
  }

  public async getCharacter(ctx: HonoContext<'/:id'>) {
    const id = req.params.id
    const { full } = req.query

    const character = await this.characterService.getCharacter(id)

    if (character) {
      const appearance = await this.characterAppearanceService.getCharacterAppearance(id)
      let data = {
        ...character.getInfo(),
        appearance: appearance ? appearance.getInfo() : null,
        stats: null,
        healthStats: null,
        murderStats: null,
        wallet: null,
      }

      if (full) {
        const stats = await this.characterStatsService.getCharacterStats(id)
        const healthStats = await this.characterHealthStatsService.getCharacterHealthStats(id)
        const murderStats = await this.characterMurderStatsService.getCharacterMurderStats(id)
        const wallet = await this.characterWalletService.getCharacterWallet(id)
        data = {
          ...data,
          stats,
          healthStats,
          murderStats,
          wallet,
        }
      }

      return ctx.json(data)
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
      const account = req.body?._account as AccountData

      const character = Character(data)
      character.accountId = account.id
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

      const duplicated = await this.characterService.getDuplicatedFields(character)
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
        characterId: character.id,
        level: 1,
        exp: 0,
        rebirths: 0,
        skillPoints: 0,
        elementPoints: 0,
        rebirthPoints: 0,
        rank: '',
      })

      const healthStats = CharacterHealthStats({
        characterId: character.id,
        vitality: '0.00',
        stamina: '0.00',
        mana: '0.00',
        manaReserve: '0.00',
      })

      const murderStats = CharacterMurderStats({
        characterId: character.id,
        honor: 0,
        deathCount: '0.00',
        kills: 0,
        deaths: 0,
        assists: 0,
      })

      const charAppearance = CharacterAppearance({
        characterId: character.id,
        skinTone: appearance.skinTone,
        hairstyle: appearance.hairstyle,
        facestyle: appearance.facestyle,
        gender: appearance.gender,
      })

      const wallet = CharacterWallet({
        characterId: character.id,
        hesedias: 50,
        nexumCoins: 0,
      })

      // * Create data
      await this.characterService.createCharacter(character)
      await this.characterStatsService.createCharacterStats(stats)
      await this.characterHealthStatsService.createCharacterHealthStats(healthStats)
      await this.characterMurderStatsService.createCharacterMurderStats(murderStats)
      await this.characterAppearanceService.createCharacterAppearance(charAppearance)
      await this.characterWalletService.createCharacterWallet(wallet)

      console.log('Created', character.getInfo())

      return ctx.json(character.getInfo())
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

  public async getCharactersByAccount(ctx: HonoContext<'/getAllByAccount'>): Promise<void> {
    const { _account } = (await ctx.req.json()) as { _account: AccountData }

    const characters = await this.characterService.getAllAccountCharacters(_account.id)
    for (let i = 0; i < characters.length; i++) {
      const character = characters[i]
      if (!character || !character.id) continue

      const stats = await this.characterStatsService.getCharacterStats(character.id)
      characters[i] = {
        ...character.getInfo(),
        stats: stats ? stats.getInfo() : null,
      }
    }

    return ctx.json(characters)
  }

  public async deleteCharacter(ctx: HonoContext<'/delete'>) {
    const { character_id } = req.params

    const existsCharacter = await this.characterService.existsCharacter(character_id)

    if (!existsCharacter) {
      const error = new NotFound('CHARACTER_NOT_FOUND')

      return ctx.json(
        {
          error,
        },
        error.status
      )
    }

    await this.characterService.deleteCharacter(character_id)

    return ctx.json({
      ok: true,
      message: 'Character deleted succesfully',
    })
  }
}
