import { ExpressServer } from './server/services/expressServer'
import { registerRoutes } from './server/routes'
import { config } from 'dotenv'
import { TcpClient } from './tcp-client/services/tcpClient'
config()

const server = new ExpressServer()
const tcpClient = new TcpClient()
const app = server.getApp()

registerRoutes(app)

// * HTTP Server
const port = process.env.PORT || 3000
server.listen(Number(port))

// * TCP Client
tcpClient.send({
  name: 'jo'
})
