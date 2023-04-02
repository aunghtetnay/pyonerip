import crawl from './crawl.js'
import parsePlaylistFromUrl from './parsePlaylistFromUrl.js'
import parseVideoFromUrl from './parseVideoFromUrl.js'
import saveChunks from './saveChunks.js'
import mergeChunks from './mergeChunks.js'

try {
    // const m3u8Url = await crawl('https://www.pyoneplay.com/watch/01gwv0dyfkfetnen00jt5ke87z')
    const chunkUrls = await parsePlaylistFromUrl('https://vz-30d21f49-6b1.b-cdn.net/bcdn_token=RJwLlH9ybyXo5ybB4NRCJbu80gyj7CQjMpjWoUn50EI&expires=1680439078&token_path=%2Fab6f2e96-83b1-4e01-ad02-32fb23f71ddd%2F/ab6f2e96-83b1-4e01-ad02-32fb23f71ddd/playlist.m3u8')
    console.log('chunkUrls', chunkUrls)
    const promises = Object.entries(chunkUrls.resolutionM3U8FileUrlMap).map(([resolution, url]) => parseVideoFromUrl(url))
    const result = await Promise.all(promises)
    console.log('result', result)
    console.log('available resolutions: ', result.map(item => item.resolution))

    // const item = result[0]
    // console.log('first one: ', item.resolution, item.totalDuration, item.baseUrl)
    // const dirname = await saveChunks(`prod${item.resolution}`, item.chunksUrlList.map((url) => `${item.baseUrl}/${url}`))
    // console.log('dirname', dirname)
    // const resultPath = await mergeChunks(`prod${item.resolution}`)
    // console.log('resultPath', resultPath)
} catch (e) {
    console.log('errorkasdf', e)
}