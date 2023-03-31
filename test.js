import r from './parsePlaylist.js';
import c from './crawl.js'

// const u = 'https://vz-30d21f49-6b1.b-cdn.net/bcdn_token=hlpmCSlK6CMmrERxsObP3a5m5i-dX-fzMzSqTyd8AGk&expires=1680202415&token_path=%2Fee4b9c0d-b165-43c1-8796-5e3ce6252e32%2F/ee4b9c0d-b165-43c1-8796-5e3ce6252e32/playlist.m3u8'
// const u = "https://vz-30d21f49-6b1.b-cdn.net/bcdn_token=hlpmCSlK6CMmrERxsObP3a5m5i-dX-fzMzSqTyd8AGk&expires=1680202415&token_path=%2Fee4b9c0d-b165-43c1-8796-5e3ce6252e32%2F/ee4b9c0d-b165-43c1-8796-5e3ce6252e32/1280x720/video.m3u8"

const page = 'https://www.pyoneplay.com/watch/01gwq4azhhgp38v3xj03es3m81'
// r(u).then(console.log).catch(e => console.log('errorkasdf', e))
c(page).then(console.log).catch(e => console.log('errorkasdf', e))