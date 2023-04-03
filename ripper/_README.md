# pyonerip
PyonePlay ripper.

**Pyone Play Ripper** is a Node.js module that allows you to rip videos from [Pyone Play platform](https://www.pyoneplay.com/). It works by crawling the [Pyone Play website](https://www.pyoneplay.com/) using `Puppeteer`, parsing the `H3U8` file, and downloading the .ts chunks using `wget`. The downloaded chunks are then merged into a single video using `ffmpeg`.

## Installation

To use Pyone Play Ripper, you'll need to have Node.js installed on your system. Once you have Node.js installed, you can install Pyone Play Ripper by running the following command:

```bash
npm install pyone-play-ripper
```

## Usage

To use Pyone Play Ripper, you'll need to require it in your Node.js project:

```javascript
const PyonePlayRipper = require('pyone-play-ripper');
```

You can then use Pyone Play Ripper to rip a video by calling the ripVideo method:

```javascript
const videoUrl = 'https://www.pyoneplay.com/watch/123456';
const outputDir = './videos';
const options = {
  concurrency: 4,
  ffmpegPath: '/usr/local/bin/ffmpeg'
};

PyonePlayRipper.ripVideo(videoUrl, outputDir, options)
  .then(() => {
    console.log('Video has been ripped successfully!');
  })
  .catch((error) => {
    console.error('An error occurred while ripping the video:', error);
  });
```

The ripVideo method takes three arguments:

- `videoUrl`: the URL of the Pyone Play video you want to rip
- `outputDir`: the directory where the ripped video will be saved
- `options`: an object containing optional parameters
- - `concurrency`: the maximum number of simultaneous downloads (default: 4)
- - `ffmpegPath`: the path to the ffmpeg executable (default: 'ffmpeg')

## Performance

To improve performance, you can try the following:

Increase the concurrency option to download more chunks simultaneously

- Use a faster internet connection or a server with higher bandwidth
- Use a faster machine or a machine with more cores for the ripping process
- Optimize the Puppeteer and ffmpeg settings to reduce the CPU and memory usage

## License

Pyone Play Ripper is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
