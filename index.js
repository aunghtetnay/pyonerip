import { Worker, workerData } from 'node:worker_threads'

import parsePlaylist from './parsePlaylist.js'

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
    const r = await ripPlaylist('https://vz-30d21f49-6b1.b-cdn.net/bcdn_token=kTry1_eGIbGVk-MKu9nRnVeT8bMs2UMuwP954C67jbo&expires=1680224026&token_path=%2Fefa1441b-efad-4d04-9639-f0bc973a16fa%2F/efa1441b-efad-4d04-9639-f0bc973a16fa/playlist.m3u8')
    const result = await downloadAndMergeChunks(r)
    console.log(result)
} catch (e) {
    console.log('errorkasdf', e)
}