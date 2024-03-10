import { Request, Response } from 'express'
import { CharacterService } from '../services/characterService'
import { Character } from '../domain/character'
import { BadRequest, DuplicatedError, NotFound } from '../../shared/errors/customErrors'
import { ControllerBase } from '../../shared/domain/controllerBase'
import { Account } from '../../account/domain/account'
import { CharacterStats } from '../domain/characterStats'
import { CharacterStatsService } from '../services/characterStatsService'
import { CharacterHealthStatsService } from '../services/characterHealthStatsService'
import { CharacterMurderStatsService } from '../services/characterMurderStatsService'
import { CharacterHealthStats } from '../domain/characterHealthStats'
import { CharacterMurderStats } from '../domain/characterMurderStats'
import { CharacterWallet } from '../domain/characterWallet'
import { CharacterWalletService } from '../services/characterWalletService'
import { CharacterAppearance } from '../domain/characterAppearance'
import { CharacterAppearanceService } from '../services/characterAppearanceService'
import { FullCharacter } from '../domain/fullCharacter'

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

  public async getAllCharacters(req: Request, res: Response): Promise<void> {
    const characters = await this.characterService.getAllCharacters()

    res.json(characters.map(character => character.getInfo()))
  }

  public async getCharacter(req: Request, res: Response): Promise<void> {
    const id = req.params.id
    const { full } = req.query

    const character = await this.characterService.getCharacter(id)

    if (character) {
      const appearance = await this.characterAppearanceService.getCharacterAppearance(id)
      let data: FullCharacter = {
        ...character.getInfo(),
        appearance: appearance ? appearance.getInfo() : null,
        stats: null,
        healthStats: null,
        murderStats: null,
        wallet: null
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
          wallet
        }
      }

      res.json(data)
    } else {
      const notFoundError = new NotFound('CHARACTER_NOT_FOUND')
      res.status(notFoundError.status).send({ error: notFoundError })
    }
  }

  public async createCharacter(req: Request, res: Response): Promise<void> {
    try {
      const { character: data, appearance } = req.body as {
        character: Partial<Character>
        appearance: Partial<CharacterAppearance>
      }
      const account = req.body?._account as Account

      const character = Character.create(data) as Character
      character.account_id = account.id
      character.division = character.division || ''
      character.profession = character.profession || ''
      character.generateID()

      if (!character.isComplete()) {
        const error = new BadRequest()
        res.status(error.status).send({ error })
        return
      }

      const duplicated = await this.characterService.getDuplicatedFields(character)
      if (duplicated.length > 0) {
        const error = new DuplicatedError(duplicated)
        res.status(error.status).send({ error })
        return
      }

      // * Default values for character
      const stats = CharacterStats.create({
        character_id: character.id,
        level: 1,
        exp: 0,
        rebirths: 0,
        skill_points: 0,
        element_points: 0,
        rebirth_points: 0,
        rank: 0
      }) as CharacterStats
      stats.generateID()

      const healthStats = CharacterHealthStats.create({
        character_id: character.id,
        vitality: 0,
        stamina: 0,
        mana: 0,
        mana_reserve: 0
      }) as CharacterHealthStats
      healthStats.generateID()

      const murderStats = CharacterMurderStats.create({
        character_id: character.id,
        honor: 0,
        death_count: 0,
        kills: 0,
        deaths: 0,
        assists: 0
      }) as CharacterMurderStats
      murderStats.generateID()

      const charAppearance = CharacterAppearance.create({
        character_id: character.id,
        skin_tone: appearance.skin_tone,
        hairstyle: appearance.hairstyle,
        facestyle: appearance.facestyle,
        gender: appearance.gender
      }) as CharacterAppearance
      charAppearance.generateID()

      const wallet = CharacterWallet.create({
        character_id: character.id,
        hesedias: 50,
        nexum_coins: 0
      }) as CharacterWallet
      wallet.generateID()

      // * Create data
      await this.characterService.createCharacter(character)
      await this.characterStatsService.createCharacterStats(stats)
      await this.characterHealthStatsService.createCharacterHealthStats(healthStats)
      await this.characterMurderStatsService.createCharacterMurderStats(murderStats)
      await this.characterAppearanceService.createCharacterAppearance(charAppearance)
      await this.characterWalletService.createCharacterWallet(wallet)

      res.status(201).send(character.getInfo())
    } catch (error) {
      res.status(500).json(error)
    }
  }

  public async getCharactersByAccount(req: Request, res: Response): Promise<void> {
    const { _account } = req.body as { _account: Account }

    const characters: Character[] = await this.characterService.getAllAccountCharacters(_account.id)
    res.json(characters.map(character => character.getInfo()))
  }

  public async deleteCharacter(req: Request, res: Response): Promise<void> {
    const { character_id } = req.params

    const existsCharacter = await this.characterService.existsCharacter(character_id)

    if (!existsCharacter) {
      const error = new NotFound('CHARACTER_NOT_FOUND')

      res.status(error.status).send({ error })

      return
    }

    const ok = await this.characterService.deleteCharacter(character_id)
    const message = ok ? 'Character deleted succesfully' : 'Something went wrong'

    res.json({ ok, message })
  }
}
