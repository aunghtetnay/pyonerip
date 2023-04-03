import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'

import showRouter from './routers/show.router.js'
import episodeRouter from './routers/episode.router.js'
import channelRouter from './routers/channel.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(cors())
app.use(helmet())
app.use(compression())

// routes
app.use('/api/v1/shows', showRouter)
app.use('/api/v1/episodes', episodeRouter)
app.use('/api/v1/channels', channelRouter)

app.use((req, res) => res.send('OK'))

export default app