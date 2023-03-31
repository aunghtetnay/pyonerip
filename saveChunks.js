import { exec } from 'child_process'
import { mkdir, writeFile } from 'fs/promises'

export default async function saveChunks(filename, chunksUrlList) {
    // create directory
    const dirname = filename
    await mkdir(dirname)

    // write chunks url list to file
    await writeFile(`${dirname}/urls.txt`, chunksUrlList.join('\n'))

    // construct download command
    const downloadChunksCmd = `wget -i ${dirname}/urls.txt -P ${dirname}/ -t 3 --limit-rate=10M`

    // run download command
    return new Promise((resolve, reject) => {
        const cp = exec(downloadChunksCmd, (err, stdout, stderr) => {
            if (err) reject(err)
            if (stderr) console.error(stderr)
            if (stdout) console.log(stdout)
        })
        cp.on('spawn', () => console.log('spawned', process.pid))
        cp.on('exit', (code) => code != 0 ? reject(code) : resolve(dirname))
    })
}