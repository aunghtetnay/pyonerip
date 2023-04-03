import ppGetAllEpisodes from '../api/getAllEpisodes.js'

export async function getAllEpisodes(req, res) {
    try {
        const queries = req.query
        const response = await ppGetAllEpisodes(queries)
        res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
}
