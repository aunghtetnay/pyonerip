import { exec, spawn } from 'child_process'
import { Readable, Transform } from 'stream'
import { createWriteStream } from 'fs'
import { mkdir, writeFile } from 'fs/promises'

export default async function saveChunks(filename, chunksUrlList) {
    // temp directory is the same as the filename
    const dirname = filename
    // create directory
    await mkdir(dirname)

    const urlFileName = await writeUrlFile(dirname, chunksUrlList)

    // run download command
    return new Promise((resolve, reject) => {
        // wget: read urls from file, save to directory, retry 3 times, limit rate to 10M
        // download chunks' name is the last part of url (wget feature)
        // bind child process's stdio to parent process's stdio to show progress
        const cp = spawn('wget', ['-i', `${dirname}/${urlFileName}`, '-P', `${dirname}/`, '-t', '3', '--limit-rate=10M'], { stdio: 'inherit' })
        cp.on('spawn', () => console.log('spawned', process.pid))
        cp.on('exit', (code) => code != 0 ? reject(code) : resolve(dirname))
    })
}

async function writeUrlFile(dirname, chunksUrlList) {
    // write chunks url list to file
    const filename = 'urls.txt'

    // use streams to write file
    const readStream = Readable.from(chunksUrlList)
    const writeStream = createWriteStream(`${dirname}/${filename}`)
    const transformStream = new Transform({
        transform(chunk, encoding, callback) {
            this.push(`${chunk}\n`)
            callback()
        }
    })

    return new Promise((resolve, reject) => {
        const writeFile = readStream.pipe(transformStream).pipe(writeStream)
        writeFile.on('finish', () => resolve(filename))
        writeFile.on('error', reject)
    })
}