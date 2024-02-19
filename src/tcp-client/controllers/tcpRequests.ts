import { Request, Response } from 'express'
import { ControllerBase } from '../../shared/domain/controllerBase'
import { TcpClient } from '../services/tcpClient'

export default class TcpRequestsController extends ControllerBase {
  constructor() {
    super()
  }

  public async getAllData(req: Request, res: Response): Promise<void> {
    // * TCP Client
    const tcpClient = new TcpClient()
    tcpClient.send({
      data: 'all'
    })

    res.send('Done.')
  }
}
