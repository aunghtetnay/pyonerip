import { Worker, workerData } from 'node:worker_threads'

import parsePlaylist from './parsePlaylist.js'
import crawl from './crawl.js'

export async function ripVideo({ id, resolution, url }) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', { workerData: { id, resolution, url } })
        worker.on('message', resolve)
        worker.on('error', reject)
        worker.on('exit', (code) => {
            if (code != 0) reject(new Error(`Worker stopped with exit code ${code}`))
        })
    })
}

export default async function ripPlaylist(url) {
    const { id, streams } = await parsePlaylist(url)
    // const workerPromises = Object.keys(streams).map((key) => ripVideo({ id, resolution: key, url: streams[key] }))
    // return Promise.all(workerPromises)
    // console.log(streams)

    const key = '352x240'
    return await ripVideo({ id, resolution: key, url: streams[key] })
}

export async function downloadAndMergeChunks({ id, resolution, result: { totalDuration, urls: videoUrls } }) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./downloader_worker.js', { workerData: { id, resolution, videoUrls } })
        worker.on('message', resolve)
        worker.on('error', reject)
        worker.on('exit', (code) => {
            if (code != 0) reject(new Error(`DownloadAndMerge worker stopped with exit code ${code}`))
        })
    })
}

try {
    const m3u8Url = await crawl('https://www.pyoneplay.com/watch/01gwq4azhhgp38v3xj03es3m81')
    // console.log('hmm?', m3u8Url)
    const result = await ripPlaylist(m3u8Url)
    const r = await downloadAndMergeChunks(result)
    console.log('r is', r)
} catch (e) {
    console.log('errorkasdf', e)
}