import { Worker, workerData } from 'node:worker_threads'

import crawl from './crawl.js'
import parsePlaylistFromUrl from './parsePlaylistFromUrl.js'
import parseVideoFromUrl from './parseVideoFromUrl.js'

export async function downloadChunks({ id, resolution, result: { urls: videoUrls } }) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./download_worker.js', { workerData: { id, resolution, videoUrls } })
        worker.on('message', resolve)
        worker.on('error', reject)
        worker.on('exit', (code) => {
            if (code != 0) reject(new Error(`Download worker stopped with exit code ${code}`))
        })
    })
}

export async function mergeChunks({ dirname }) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./merge_worker.js', { workerData: { dirname } })
        worker.on('message', resolve)
        worker.on('error', reject)
        worker.on('exit', (code) => {
            if (code != 0) reject(new Error(`Merge worker stopped with exit code ${code}`))
        })
    })
}

try {
    // const m3u8Url = await crawl('https://www.pyoneplay.com/watch/01gwq4azhhgp38v3xj03es3m81')
    const m3u8Url = 'https://vz-30d21f49-6b1.b-cdn.net/bcdn_token=n_QB5pYQDeYyhcDrqLxGCkEXPes9g-LMfFE5swprjXA&expires=1680319238&token_path=%2Fefa1441b-efad-4d04-9639-f0bc973a16fa%2F/efa1441b-efad-4d04-9639-f0bc973a16fa/playlist.m3u8'
    const chunkUrls = await parsePlaylistFromUrl(m3u8Url)
    console.log(chunkUrls)
    // const videoM3U8FileUrl = 'https://vz-30d21f49-6b1.b-cdn.net/bcdn_token=n_QB5pYQDeYyhcDrqLxGCkEXPes9g-LMfFE5swprjXA&expires=1680319238&token_path=%2Fefa1441b-efad-4d04-9639-f0bc973a16fa%2F/efa1441b-efad-4d04-9639-f0bc973a16fa/352x240/video.m3u8'
    const promises = Object.entries(chunkUrls.resolutionM3U8FileUrlMap).map(([resolution, url]) => parseVideoFromUrl(url))
    const result = await Promise.all(promises)
    console.log('available resolutions: ', result.map(item => item.resolution))
    console.log('first one: ', result[0], result[0].chunksUrlList.length)
    // const success = await downloadChunks(chunkUrls)
    // const { filename } = await mergeChunks(chunkUrls)
    // console.log('finished', filename)

} catch (e) {
    console.log('errorkasdf', e)
}