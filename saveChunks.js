import { exec, spawn } from 'child_process'
import { Readable, Transform } from 'stream'
import { createWriteStream } from 'fs'
import { mkdir, writeFile } from 'fs/promises'

export default async function saveChunks(filename, chunksUrlList) {
    // create directory
    const dirname = filename
    await mkdir(dirname)

    // write chunks url list to file
    const readStream = Readable.from(chunksUrlList)
    const writeStream = createWriteStream(`${dirname}/urls.txt`)
    const transformStream = new Transform({
        transform(chunk, encoding, callback) {
            this.push(`${chunk}\n`)
            callback()
        }
    })
    console.time('writing file')
    // 0.998ms
    // writeFile(`${dirname}/urls.txt`, chunksUrlList.join('\n'))
    // 0.631ms
    readStream.pipe(transformStream).pipe(writeStream)
    console.timeEnd('writing file')

    // construct download command
    const downloadChunksCmd = `wget -i ${dirname}/urls.txt -P ${dirname}/ -t 3 --limit-rate=10M`

    // run download command
    return new Promise((resolve, reject) => {
        const cp = exec(downloadChunksCmd, (err, stdout, stderr) => {
            if (err) reject(err)
            if (stderr) console.error(stderr)
            if (stdout) console.log(stdout)
        })
        // const cp = spawn('wget', ['-i', `${dirname}/urls.txt`, '-P', `${dirname}/`, '-t', '3', '--limit-rate=10M'])
        cp.on('spawn', () => console.log('spawned', process.pid))
        cp.on('exit', (code) => code != 0 ? reject(code) : resolve(dirname))
        cp.stdout.pipe(process.stdout)
        cp.stderr.pipe(process.stderr)
    })
}