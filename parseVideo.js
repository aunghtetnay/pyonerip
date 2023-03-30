import parsePlaylist from './parsePlaylist.js'
import readFileUrlContent from './readFileUrlContent.js'

import { inspect } from 'node:util'
// https://vz-30d21f49-6b1.b-cdn.net/bcdn_token=hlpmCSlK6CMmrERxsObP3a5m5i-dX-fzMzSqTyd8AGk&expires=1680202415&token_path=%2Fee4b9c0d-b165-43c1-8796-5e3ce6252e32%2F/ee4b9c0d-b165-43c1-8796-5e3ce6252e32/352x240/video.m3u8
export default async function parseVideo(videoUrl) {
    const baseUrl = videoUrl.slice(0, videoUrl.lastIndexOf('/'))
    const id = baseUrl.slice(baseUrl.lastIndexOf('/') + 1)

    const playlistItemList = await readFileUrlContent(videoUrl)

    let totalDuration = 0

    const urls = playlistItemList.map((item) => {
        totalDuration += item.get('duration')
        const url = `${baseUrl}/${item.get('uri')}`
        return url
    })

    return {
        id,
        totalDuration,
        urls
    }
}