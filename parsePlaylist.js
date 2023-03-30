
import readFileUrlContent from './readFileUrlContent.js'

export default async function parsePlaylist(playlistUrl) {
    const baseUrl = playlistUrl.slice(0, playlistUrl.lastIndexOf('/'))
    const id = baseUrl.slice(baseUrl.lastIndexOf('/') + 1)

    const streamItemList = await readFileUrlContent(playlistUrl)

    const parsed = streamItemList.reduce((acc, item) => {
        const resolution = item.get('resolution').join('x')
        const url = `${baseUrl}/${item.get('uri')}`
        return {
            ...acc,
            [resolution]: url
        }
    }, {})

    return {
        id,
        url: playlistUrl,
        baseUrl,
        streams: parsed
    }
}