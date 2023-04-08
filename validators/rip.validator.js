import { object, string } from 'yup'

const parseSchema = object({
    streamingUrl: string().matches(/playlist.m3u8$/, { message: 'invalid streamingUrl' }).required()
})

export async function validateParse(req, res, next) {
    try {
        await parseSchema.validate(req.body)
        next()
    } catch ({ name, message }) {
        res.status(406).json({ name, message })
    }
}

const filenameRegex = /^[a-zA-Z0-9\-]+$/
const filenameErrorMessage = 'Invalid filename. Only alphanumeric characters and dashes are allowed.'
const urlRegex = /video.m3u8$/
const urlErrorMessage = 'Invalid url. Not ending with video.m3u8'
const ripSchema = object({
    // IMPORTANT:
    // sanitize name, so that dangerous unix commands can't be executed
    name: string().matches(filenameRegex, { message: filenameErrorMessage }).required(),
    // validate correct url
    url: string().matches(urlRegex, { message: urlErrorMessage }).required()
})

export async function validateRip(req, res, next) {
    try {
        await ripSchema.validate(req.body)
        next()
    } catch ({ name, message }) {
        res.status(406).json({ name, message })
    }
}