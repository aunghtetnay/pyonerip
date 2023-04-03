import ppGetAllShows from '../api/getAllShows.js'
import ppGetShowEpisodes from '../api/getShowEpisodes.js'
import ppSearch from '../api/search.js'

export async function getAllShows(req, res) {
    try {
        const queries = req.query
        const response = await ppGetAllShows(queries)
        res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export async function getShowEpisodes(req, res) {
    try {
        const { showId } = req.params
        const response = await ppGetShowEpisodes({ showId })
        res.status(response.status).json(response)
    } catch (error) {
        return res.status(err).json(error)
    }
}

export async function search(req, res) {
    try {
        const { q } = req.query
        const response = await ppSearch({ keywords: q })
        res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json(error)
    }
}