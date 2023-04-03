import ppGetAllChannels from '../api/getAllChannels.js'

export async function getAllChannels(req, res) {
    try {
        const queries = req.query
        const response = await ppGetAllChannels(queries)
        res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
}
