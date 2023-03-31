import fs from 'node:fs'
import { exec } from 'node:child_process'

import { parentPort, workerData } from 'node:worker_threads'

const { id, resolution, videoUrls } = workerData

// const downloadFile = fs.createWriteStream(`./temp/${id}[${resolution}].txt`, { flags: 'a' })
const dirname = `${id}-${resolution}`

fs.mkdirSync(dirname)

const downloadChunksCmd = `wget -i $'${videoUrls.join('\n')}' -P ${dirname}/ -t 3 --limit-rate=10M`

const cp = exec(downloadChunksCmd)

console.log('inside downloader worker')

cp.on('exit', (code) => {
    if (code != 0) throw new Error(code)
    parentPort.postMessage(`downloader exited with code ${code}`)

})

// videoUrls.urls.forEach((url) => downloadFile.write(`${url}\n`))