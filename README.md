# Pyone Play Ripper

## Process

### Parsing

This ripper is designed to extract video files by obtaining the m3u8 playlist URL, parsing it, and creating a list of available resolutions along with the corresponding m3u8 file URLs. The m3u8 playlist is retrieved using the requests library, and once obtained, it is parsed and extract the available resolutions and their corresponding video URLs. This allows the ripper to provide users with a list of available video resolutions to choose from, and to download the selected video file at the desired resolution.

### Downloading

Once the list of video chunks' URLs is obtained, they need to be written into a file in order to be downloaded using `wget`. The code for downloading the chunks and saving them to disk is provided in the [saveChunks.js](./ripper/saveChunks.js) file. It creates a new directory, and then downloads the chunks in **parallel**.

wget is invoked with a set of options that include the list of chunk URLs to download, the directory to save them in, and limits on the number of download retries and the download rate per chunk. The function also creates a temporary directory with a unique name and saves the downloaded chunks into it.

```javascript
const cp = spawn('wget', wgetOptions, { stdio: 'inherit' })
cp.on('spawn', () => console.log('spawned', process.pid))
cp.on('exit', (code) => code != 0 ? reject(code) : resolve(dirname))
```

``` javascript
const readStream = Readable.from(chunksUrlList)
const writeStream = createWriteStream(`${dirname}/${urlFileName}`)
const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        this.push(`${chunk}\n`)
        callback()
    }
})
```

```javascript
const writeFile = readStream.pipe(transformStream).pipe(writeStream)
```

### Merging

After all of the video chunks have been downloaded, the process is handed off to [mergeChunks.js](./ripper/mergeChunks.js), which uses the ffmpeg tool to merge the chunks into a single video file.

`mergeChunks.js` is passed the directory path of the downloaded video chunks as a command line argument. It reads the contents of the directory, sorts the files in ascending order according to their names, and constructs a file list to pass to ffmpeg for merging the chunks into a single video file.

```javascript
const dirContents = await readdir(dirname)
const tsFiles = dirContents
    .filter(file => file.endsWith('.ts'))
    .map(file => `${dirname}/${file}`)
    .sort(sortByNumber)
    .join('|')
```

Once the necessary chunks are located and prepared, the child process is spawned to run the `FFmpeg` command. `FFmpeg` is a popular open-source tool used for handling video and audio processing tasks, such as video encoding, decoding, and transcoding.

```javascript
const cp = spawn('ffmpeg', ffmpegOptions, { stdio: 'inherit' })
```

After the spawn method is called, the child process's events are listened to. If the child process exits with a non-zero exit code, the returned promise is rejected with the error code. If the child process exits with a zero exit code, the returned promise is resolved with the output file name.
