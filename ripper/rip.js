import parsePlaylistFromUrl from './parsePlaylistFromUrl.js'
import parseVideoFromUrl from './parseVideoFromUrl.js'
import saveChunks from './saveChunks.js'
import mergeChunks from './mergeChunks.js'

export default async function rip({ name, url }) {
    const item = await getVideoChunkUrls(url)
    const title = `${name}-${item.resolution}`
    const dirname = await saveChunks(title, item.chunksUrlList.map((url) => `${item.baseUrl}/${url}`))
    const resultPath = await mergeChunks(dirname)
    return resultPath
}

export async function availableResolutions(m3u8Url) {
    return await parsePlaylistFromUrl(m3u8Url)
}

export async function getVideoChunkUrls(m3u8VideoUrl) {
    return await parseVideoFromUrl(m3u8VideoUrl)
}
