import fs from 'node:fs'
import { exec } from 'node:child_process'

import { parentPort, workerData } from 'node:worker_threads'

export default async function downloadVideos(videoUrls) {
    console.log(`Worker ${process.pid} downloading ${videoUrls}!`)
}

const { id, resolution, videoUrls } = workerData

// const downloadFile = fs.createWriteStream(`./temp/${id}[${resolution}].txt`, { flags: 'a' })
const dirname = `${id}-${resolution}`

fs.mkdirSync(dirname)

const downloadChunksCmd = `wget -i $'${videoUrls.join('\n')}' -P ${dirname}/ -t 3 --limit-rate=10M`
const mergeChunksCmd = `ffmpeg -i "concat:$(ls -v ${dirname}/*.ts | tr '\n' '|')" -vf "drawtext=text='PYONERIP.COM':x=10:y=h-th-10:fontcolor=white@0.5:fontsize=12:alpha=0.5" -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k ${id}-${resolution}.mp4`

const cp = exec(downloadChunksCmd)

console.log('inside downloader worker')

cp.on('exit', (code) => {
    if (code != 0) throw new Error(code)
    // parentPort.postMessage(`downloader exited with code ${code}`)
    exec(mergeChunksCmd, (err, stdout, stderr) => {
        if (err) {
            console.log(err)
        }
        console.log(stdout)
        console.log(parentPort.postMessage('done'))
    }).on('exit', (code) => {
        if (code == 0)
            parentPort.postMessage(`merger exited with code ${code}`)
    })
})

// videoUrls.urls.forEach((url) => downloadFile.write(`${url}\n`))