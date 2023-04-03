import rip, { availableResolutions, getVideoChunkUrls } from './rip.js'
import readFileUrlContent from './readFileUrlContent.js'
import parsePlaylistFromUrl from './parsePlaylistFromUrl.js'
import parseVideoFromUrl from './parseVideoFromUrl.js'
import saveChunks from './saveChunks.js'
import mergeChunks from './mergeChunks.js'

export {
    // takes playlist m3u8, return resolutions m3u8 urls
    availableResolutions,
    // takes resolution m3u8, return chunks urls
    getVideoChunkUrls,
    // takes chunk urls, return video path
    rip,

    // EXTRA
    // takes m3u8 file url, return m3u8 parsed content
    readFileUrlContent,
    // takes playlist m3u8 file url, return parsed playlist data (customized)
    parsePlaylistFromUrl,
    // takes video m3u8 file url, return parsed video data (customized)
    parseVideoFromUrl,
    // takes file name and chunk url list, return downloaded chunks directory name
    saveChunks,
    // takes downloaded chunks directory name, return merged video path
    mergeChunks
}