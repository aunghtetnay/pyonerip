import { availableResolutions, rip } from '../ripper/index.js'
import { upload } from '../helpers/uploadToS3.js'

export async function parseStreamingUrl(req, res) {
    try {
        const { streaming_url } = req.body
        const result = await availableResolutions(streaming_url)
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}

export async function rips(req, res) {
    try {
        const { streaming_url, series_name, name } = req.body
        // process, might want to dispatch to worker
        console.log(`processing: ${streaming_url}, ${name}`)
        const resultPath = await rip({ name, url: streaming_url })
        // strip the path to get the filename
        const resultFileName = resultPath.slice(resultPath.lastIndexOf('/') + 1)
        const uploaded = await upload(resultPath, `${series_name}/${resultFileName}`)
        res.status(200).json(uploaded)

    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}