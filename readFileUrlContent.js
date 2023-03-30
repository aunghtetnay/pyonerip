import https from 'node:https'
import url from 'node:url'
import m3u8 from 'm3u8'

// PlaylistItem, StreamItem

export default async function readFileUrlContent(uri) {
    return new Promise((resolve, reject) => {

        const parsedUrl = url.parse(uri)

        const options = {
            ...parsedUrl,
            method: 'GET'
        }

        const req = https.request(options, (res) => {
            const result = []

            const parser = m3u8.createStream()
            res.pipe(parser)

            parser.on('item', (item) => result.push(item))
            parser.on('end', () => resolve(result))
        });

        req.on('error', (e) => {
            reject(e)
        });

        req.end();
    })
}