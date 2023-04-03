import express from 'express'

const router = express.Router()

import { getAllEpisodes } from '../controllers/episode.controller.js'

// PATH: /api/v1/episodes

router.route('/')
    .get(getAllEpisodes)

export default router