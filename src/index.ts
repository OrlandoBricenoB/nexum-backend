import { config } from 'dotenv'
config()

import { HonoServer } from './server/services/honoServer'
import { registerRoutes } from './server/routes'

const server = new HonoServer()
const app = server.getApp()

registerRoutes(app)

// * HTTP Server
const port = process.env.PORT || 3000
server.listen(Number(port))

export default app
