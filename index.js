import { createServer } from 'node:http'

import app from './app.js'
import { PORT } from './config.js'

const server = createServer(app)

server.listen(PORT)

server.on('listening', () => console.log(`Server is listening on port ${PORT}`))