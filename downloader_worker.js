import fs from 'node:fs'

import { parentPort, workerData } from 'node:worker_threads'

export default async function downloadVideos(videoUrls) {
    console.log(`Worker ${process.pid} downloading ${videoUrls}!`)
}

const { id, resolution, videoUrls } = workerData

const downloadFile = fs.createWriteStream(`./temp/${id}[${resolution}].txt`, { flags: 'a' })
videoUrls.urls.forEach((url) => downloadFile.write(`${url}\n`))