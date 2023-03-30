import { parentPort, workerData, Worker } from 'node:worker_threads'

import parseVideo from './parseVideo.js'

export default async function ripVideo(videoUrl) {
    console.log(`Worker ${process.pid} started!`)
    return await parseVideo(videoUrl)
}

const { id, resolution, url } = workerData

const result = await ripVideo(url)

const worker = new Worker('./downloader_worker.js', { workerData: { id, resolution, videoUrls: result } })

parentPort.postMessage({ id, resolution, result })