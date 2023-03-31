import { parentPort, workerData, Worker } from 'node:worker_threads'

import parseVideo from './parseVideo.js'

export default async function ripVideo(videoUrl) {
    console.log(`Worker ${process.pid} started!`)
    return await parseVideo(videoUrl)
}

const { id, resolution, url } = workerData

const result = await ripVideo(url)
// await new Promise((resolve, reject) => {


//     const worker = new Worker('./download_worker.js', { workerData: { id, resolution, videoUrls: result } })
//     worker.on('message', (msg) => console.log('in worker.js', msg))
//     worker.on('error', reject)
//     worker.on('exit', resolve)

//     parentPort.postMessage({ id, resolution, result })

// })

parentPort.postMessage({ id, resolution, result })