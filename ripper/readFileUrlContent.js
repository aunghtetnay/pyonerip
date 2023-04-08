import https from 'node:https'
import url from 'node:url'
import m3u8 from 'm3u8'

// PlaylistItem, StreamItem

export default async function readFileUrlContent(uri, timeout = 10_000) {
    return new Promise((resolve, reject) => {
            const parsedUrl = url.parse(uri)

            const options = {
                ...parsedUrl,
                // need to set timeout here to if req is hanging
                timeout,
                method: 'GET'
            }

            const req = https.request(options, (res) => {
                const result = []

                const parser = m3u8.createStream()
                res.pipe(parser)

                parser.on('item', (item) => result.push(item))
                parser.on('end', () => resolve(result))
                parser.on('error', reject)
            });

            req.on('error', (e) => {
                reject(e)
            });
            
            req.on('timeout', () => reject(new Error('Timeout getting m3u8 file')))

            req.end();
    })
}