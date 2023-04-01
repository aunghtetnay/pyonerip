import crawl from './crawl.js'
import parsePlaylistFromUrl from './parsePlaylistFromUrl.js'
import parseVideoFromUrl from './parseVideoFromUrl.js'
import saveChunks from './saveChunks.js'
import mergeChunks from './mergeChunks.js'

try {
    // const m3u8Url = await crawl('https://www.pyoneplay.com/watch/01gwccf5f5mh9bdat23zv6jagh')
    // const chunkUrls = await parsePlaylistFromUrl(m3u8Url)
    // console.log(chunkUrls)
    // const promises = Object.entries(chunkUrls.resolutionM3U8FileUrlMap).map(([resolution, url]) => parseVideoFromUrl(url))
    // const result = await Promise.all(promises)
    // console.log('available resolutions: ', result.map(item => item.resolution))

    // const item = result[0]
    // console.log('first one: ', item.resolution, item.totalDuration, item.baseUrl)
    // const dirname = await saveChunks(`prod${item.resolution}`, item.chunksUrlList.map((url) => `${item.baseUrl}/${url}`))
    // console.log('dirname', dirname)
    const resultPath = await mergeChunks(`prod352x240`)
    console.log('resultPath', resultPath)
} catch (e) {
    console.log('errorkasdf', e)
}