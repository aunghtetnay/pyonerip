import { spawn } from 'child_process'
import { Readable, Transform } from 'stream'
import { createWriteStream } from 'fs'
import { mkdir } from 'fs/promises'

const CHUNK_DOWNLOAD_CONCURRENCY = 50; // Limit the number of concurrent chunk downloads
const CHUNK_DOWNLOAD_RETRY_LIMIT = 3; // Limit the number of download retries
const CHUNK_DOWNLOAD_LIMIT_RATE = '10M'; // Limit the download rate per chunk

export default async function saveChunks(filename, chunksUrlList) {
    // temp directory is the same as the filename
    const dirname = filename
    // create directory
    await mkdir(dirname)

    // Download chunks in parallel
    const chunkDownloadPromises = []
    for (let i = 0; i < chunksUrlList.length; i += CHUNK_DOWNLOAD_CONCURRENCY) {
        const urlList = chunksUrlList.slice(i, i + CHUNK_DOWNLOAD_CONCURRENCY)
        const chunkDownloadPromise = downloadChunks(urlList, dirname)
        chunkDownloadPromises.push(chunkDownloadPromise)
    }
    await Promise.all(chunkDownloadPromises)
    return dirname
}

async function downloadChunks(urlList, dirname) {
    // create chunk url files with unique name
    // important because we paralles chunk downloads
    const start = urlList[0].split('/').pop()
    const end = urlList[urlList.length - 1].split('/').pop()
    const uniqueUrlFileName = `${start}-${end}.txt`
    // creating url list file need to know unique name too
    const urlFileName = await writeUrlFile(dirname, urlList, uniqueUrlFileName)

    const wgetOptions = ['-i', `${dirname}/${urlFileName}`, '-P', `${dirname}/`, '-t', `${CHUNK_DOWNLOAD_RETRY_LIMIT}`, `--limit-rate=${CHUNK_DOWNLOAD_LIMIT_RATE}`]
    // run download command
    return new Promise((resolve, reject) => {
        // download chunks' name is the last part of url (wget feature)
        // bind child process's stdio to parent process's stdio to show progress
        const cp = spawn('wget', wgetOptions, { stdio: 'inherit' })
        cp.on('spawn', () => console.log('spawned', process.pid))
        cp.on('exit', (code) => code != 0 ? reject(code) : resolve(dirname))
    })
}

async function writeUrlFile(dirname, chunksUrlList, urlFileName) {

    // use streams to write file
    const readStream = Readable.from(chunksUrlList)
    const writeStream = createWriteStream(`${dirname}/${urlFileName}`)
    const transformStream = new Transform({
        transform(chunk, encoding, callback) {
            this.push(`${chunk}\n`)
            callback()
        }
    })

    return new Promise((resolve, reject) => {
        const writeFile = readStream.pipe(transformStream).pipe(writeStream)
        writeFile.on('finish', () => resolve(urlFileName))
        writeFile.on('error', reject)
    })
}