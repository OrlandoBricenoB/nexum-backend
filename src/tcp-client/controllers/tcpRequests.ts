import { Request, Response } from 'express'
import { ControllerBase } from '../../shared/domain/controllerBase'
import { TcpClient } from '../services/tcpClient'
import { CharacterService } from '../../character/services/characterService'

export default class TcpRequestsController extends ControllerBase {
  private characterService: CharacterService

  constructor() {
    super()

    this.characterService = new CharacterService()
  }

  public async getAllData(req: Request, res: Response): Promise<void> {
    // * TCP Client
    const tcpClient = new TcpClient()
    tcpClient.send({
      data: 'all'
    })

    res.send('Done.')
  }

  public async getCharactersByAccount(req: Request, res: Response): Promise<void> {
    const tcpClient = new TcpClient()

    const { account_id } = req.body as { account_id: string }

    const characters = await this.characterService.getAllAccountCharacters(account_id)

    tcpClient.send({
      action: 'charactersByAccount',
      data: characters
    })

    res.send('Done.')
  }
}
