import express from 'express'

const router = express.Router()

import { getAllChannels } from '../controllers/channel.controller.js'

// PATH: /api/v1/channels

router.route('/')
    .get(getAllChannels)

export default router