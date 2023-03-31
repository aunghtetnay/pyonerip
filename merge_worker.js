import fs from 'node:fs'
import { exec } from 'node:child_process'

import { parentPort, workerData } from 'node:worker_threads'

const { dirname } = workerData

const mergeChunksCmd = `ffmpeg -i "concat:$(ls -v ${dirname}/*.ts | tr '\n' '|')" -vf "drawtext=text='PYONERIP.COM':x=10:y=h-th-10:fontcolor=white@0.5:fontsize=12:alpha=0.5" -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k ${dirname}.mp4`

const cp = exec(mergeChunksCmd)

console.log('inside merge worker')

cp.on('exit', (code) => {
    if (code != 0) throw new Error(code)
    parentPort.postMessage({ filename: `${dirname}.mp4` })
})