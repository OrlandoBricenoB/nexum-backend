import { HonoServer } from './server/services/honoServer'
import { registerRoutes } from './server/routes'

const server = new HonoServer()
const app = server.getApp()

registerRoutes(app)

export default app
