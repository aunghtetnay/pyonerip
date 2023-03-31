import { exec } from 'node:child_process'

export default async function mergeChunks(dirname) {
    // construct merge command
    const watermarkSize = 20
    const mergeChunksCmd = `ffmpeg -i "concat:$(ls -v ${dirname}/*.ts | tr '\n' '|')" -vf "drawtext=text='PYONERIP.COM':x=10:y=h-th-10:fontcolor=white@0.5:fontsize=${watermarkSize}:alpha=0.5" -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k ${dirname}/${dirname}.mp4`

    // run merge command
    return new Promise((resolve, reject) => {
        const cp = exec(mergeChunksCmd, (err, stdout, stderr) => {
            if (err) reject(err)
            if (stderr) console.log(stderr)
            if (stdout) console.log(stdout)
        })
        cp.on('spawn', () => console.log('spawned', process.pid))
        cp.on('exit', (code) => code != 0 ? reject(code) : resolve(`${dirname}/${dirname}.mp4`))
    })
}