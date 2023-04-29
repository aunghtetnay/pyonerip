import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json' assert { type: 'json' }

import showRouter from './routers/show.router.js'
import episodeRouter from './routers/episode.router.js'
import channelRouter from './routers/channel.router.js'
import ripRouter from './routers/rip.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(cors())
app.use(helmet())
app.use(compression())

// rate limiter
app.set('trust proxy', true)
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true, // RateLimit-* headers
    legacyHeaders: false, // disable X-RateLimit-* headers
}))

// routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/api/v1/shows', showRouter)
app.use('/api/v1/episodes', episodeRouter)
app.use('/api/v1/channels', channelRouter)
app.use('/api/v1/rip', ripRouter)

app.use((req, res) => res.send('OK'))

export default app