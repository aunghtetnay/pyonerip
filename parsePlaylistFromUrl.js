
import readFileUrlContent from './readFileUrlContent.js'

// INPUT:
// playlist m3u8 file url
// get form video page > iframe > video > source > src

// OUTPUT:
// parsed playlist data
// gives video id, each resolution m3u8 file url
// with an obj of which each resolution value as key and m3u8 file url as value

export default async function parsePlaylistFromUrl(playlistM3U8FileUrl) {
    const baseUrl = playlistM3U8FileUrl.slice(0, playlistM3U8FileUrl.lastIndexOf('/'))
    const id = baseUrl.slice(baseUrl.lastIndexOf('/') + 1)

    const parsedM3U8Data = await readFileUrlContent(playlistM3U8FileUrl)

    const resolutionM3U8FileUrlMap = parsedM3U8Data.reduce((acc, item) => {
        const resolution = item.get('resolution').join('x')
        const url = `${baseUrl}/${item.get('uri')}`
        return {
            ...acc,
            [resolution]: url
        }
    }, {})

    return {
        id,
        baseUrl,
        resolutionM3U8FileUrlMap,
    }
}