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

const ripSchema = object({
    name: string().required(),
    url: string().matches(/video.m3u8$/, { message: 'invalid resolutionUrl' }).required()
})

export async function validateRip(req, res, next) {
    try {
        await ripSchema.validate(req.body)
        next()
    } catch ({ name, message }) {
        res.status(406).json({ name, message })
    }
}