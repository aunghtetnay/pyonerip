import parsePlaylist from './parsePlaylistFromUrl.js'

// parse m3u8 playlist and return a obj with
// id, [resolution]: m3u8 url
export default async function getPlaylistInfo(url) {
    const { id, resolutionM3U8FileUrlMap } = await parsePlaylist(url)
    // const workerPromises = Object.keys(resolutionM3U8FileUrlMap).map((key) => ripVideo({ id, resolution: key, url: resolutionM3U8FileUrlMap[key] }))
    // return Promise.all(workerPromises)
    // console.log(resolutionM3U8FileUrlMap)

    const key = '352x240'
    return { id, resolutionM3U8FileUrlMap }
}