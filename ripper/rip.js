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
/**
{
  id: 'ab6f2e96-83b1-4e01-ad02-32fb23f71ddd',
  baseUrl: 'https://vz-3b1-4e01-ad02-32fb23f71ddd',
  resolutionM3U8FileUrlMap: {
    '352x240': 'https://vz-3f71ddd/352x240/video.m3u8',
    '640x360': 'https://vz-3f71ddd/640x360/video.m3u8',
    '842x480': 'https://vz-3f71ddd/842x480/video.m3u8',
    '1280x720': 'https://vz-371ddd/1280x720/video.m3u8',
    '1920x1080': 'https://vz-371ddd/1920x1080/video.m3u8'
  }
}
*/

export async function getVideoChunkUrls(m3u8VideoUrl) {
    return await parseVideoFromUrl(m3u8VideoUrl)
}
