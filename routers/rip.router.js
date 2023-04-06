import express from 'express'

const router = express.Router()

import { parseStreamingUrl, rips } from '../controllers/rip.controller.js'

import { validateParse, validateRip } from '../validators/rip.validator.js'

// PATH: /api/v1/rip

router.route('/parse')
    .post(validateParse, parseStreamingUrl)

router.route('/')
    .post(validateRip, rips)

export default router