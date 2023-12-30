import { ExpressServer } from './server/services/expressServer'
import { registerRoutes } from './server/routes'
import { config } from 'dotenv'
config()

const server = new ExpressServer()
const app = server.getApp()

registerRoutes(app)

const port = 3000
server.listen(port)
