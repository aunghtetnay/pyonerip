import express from 'express'

const router = express.Router()

import { getAllShows, getShowEpisodes, search } from '../controllers/show.controller.js'

// PATH: /api/v1/shows

router.route('/')
    .get(getAllShows)

router.route('/search')
    .get(search)

router.route('/:showId/episodes')
    .get(getShowEpisodes)

export default router