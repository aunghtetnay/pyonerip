import parsePlaylistFromUrl from './parsePlaylistFromUrl.js'
import parseVideoFromUrl from './parseVideoFromUrl.js'
import saveChunks from './saveChunks.js'
import mergeChunks from './mergeChunks.js'

export default async function rip({ name, url }) {
    const item = await getVideoChunkUrls(url)
    const title = `${name}_${item.resolution}`
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
/**
{
    resolution: '352x240',
    baseUrl: 'https://vz-30d21f49-6b1.b-cdn.net/bcdn_token=RJwLlH9ybyXo5ybB4NRCJbu80gyj7CQjMpjWoUn50EI&expires=1680439078&token_path=%2Fab6f2e96-83b1-4e01-ad02-32fb23f71ddd%2F/ab6f2e96-83b1-4e01-ad02-32fb23f71ddd/352x240',
    totalDuration: 1956.7547999999813,
    chunksUrlList: [
      'video0.ts',  'video1.ts',  'video2.ts',  'video3.ts',  'video4.ts',
      ... 389 more items
    ]
  },
}
*/
