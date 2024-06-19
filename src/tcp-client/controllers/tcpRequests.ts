import { ControllerBase } from '../../shared/domain/controllerBase'
import { TcpClient } from '../services/tcpClient'
import { CharacterService } from '../../character/services/characterService'
import { HonoContext } from '../../server/types/HonoContext'
import { connect } from '../../config/databaseConfig'

export default class TcpRequestsController extends ControllerBase {
  constructor() {
    super()
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

    const accountId = ctx.get('accountId')

    const db = await connect(ctx.env.DATABASE_URL)
    const characters = await CharacterService(db).getAllAccountCharacters(accountId)

    tcpClient.send({
      action: 'charactersByAccount',
      data: characters,
    })

    return ctx.text('Done')
  }
}
