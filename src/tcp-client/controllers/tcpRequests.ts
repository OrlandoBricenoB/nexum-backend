import { ControllerBase } from '../../shared/domain/controllerBase'
import { TcpClient } from '../services/tcpClient'
import { CharacterService } from '../../character/services/characterService'
import { HonoContext } from '../../server/types/HonoContext'

export default class TcpRequestsController extends ControllerBase {
  private characterService: CharacterService

  constructor() {
    super()

    this.characterService = new CharacterService()
  }

  public async getAllData(ctx: HonoContext<'/'>) {
    // * TCP Client
    const tcpClient = new TcpClient()
    tcpClient.send({
      data: 'all',
    })

    return ctx.text('Done.')
  }

  public async getCharactersByAccount(ctx: HonoContext<'/'>) {
    const tcpClient = new TcpClient()

    const { account_id: accountId } = (await ctx.req.json()) as { account_id: number }

    const characters = await this.characterService.getAllAccountCharacters(accountId)

    tcpClient.send({
      action: 'charactersByAccount',
      data: characters,
    })

    return ctx.text('Done.')
  }
}
