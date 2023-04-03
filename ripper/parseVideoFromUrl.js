import readFileUrlContent from './readFileUrlContent.js'

// INPUT:
// video m3u8 file url
// get form parsing video m3u8 file url, got from parsing playlist m3u8 file

// OUTPUT:
// parsed video data
// gives video resolution, total duration, chunks .ts file url list

export default async function parseVideoFromUrl(videoM3U8FileUrl) {
    const baseUrl = videoM3U8FileUrl.slice(0, videoM3U8FileUrl.lastIndexOf('/'))
    const resolution = baseUrl.slice(baseUrl.lastIndexOf('/') + 1)

    const parsedM3U8FileData = await readFileUrlContent(videoM3U8FileUrl)

    let totalDuration = 0

    // construct big list, should delegate to worker
    const chunksUrlList = parsedM3U8FileData.map((item) => {
        totalDuration += item.get('duration')
        // construct absolute url from relative url(uri)
        // const url = `${baseUrl}/${item.get('uri')}`
        const url = item.get('uri')
        return url
    })

    return {
        resolution,
        baseUrl,
        totalDuration,
        chunksUrlList
    }
}