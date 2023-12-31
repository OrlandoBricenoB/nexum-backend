import { Request, Response } from 'express'
import { CharacterService } from '../services/characterService'
import { Character } from '../domain/character'
import { v4 as uuidv4 } from 'uuid'
import { NotFound } from '../../shared/errors/customErrors'
import { pick } from 'lodash'

export class CharacterController {
  public static characterService: CharacterService = new CharacterService()

  public async getAllCharacters(req: Request, res: Response): Promise<void> {
    const characters = await CharacterController.characterService.getAllCharacters()

    res.json(
      characters.map(character => {
        return pick(character, Character.fields)
      })
    )
  }

  public async getCharacter(req: Request, res: Response): Promise<void> {
    const id = req.params.id

    const character = await CharacterController.characterService.getCharacter(id)

    if (character) {
      res.json(pick(character, Character.fields))
    } else {
      const notFoundError = new NotFound('CHARACTER_NOT_FOUND')
      res.status(notFoundError.status).send({ error: notFoundError })
    }
  }

  public async createCharacter(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as Partial<Character>

      // * Get Fields of Character Domain
      const emptyCharacter = new Character('', '', '', '', '')
      const fields = Object.keys(emptyCharacter)

      const validData = Object.keys({
        ...data,
        id: uuidv4()
      }).reduce((newData, key) => {
        if (fields.includes(key)) {
          newData[key as 'id'] = data[key as 'id']
        }
        return newData
      }, {} as Partial<Character>)

      await CharacterController.characterService.createCharacter(validData)
      res.json(validData)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}
