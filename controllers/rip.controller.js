import { availableResolutions, rip } from '../ripper/index.js'

export async function parseStreamingUrl(req, res) {
    try {
        const { streamingUrl } = req.body
        const result = await availableResolutions(streamingUrl)
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

export async function rips(req, res) {
    try {
        const { url, name } = req.body
        // process, might want to dispatch to worker
        console.log(`processing: ${url}, ${name}`)
        const result = await rip({ name, url })
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json({ name: 'RipError', message: error.message })
    }
}