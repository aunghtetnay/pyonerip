# pyonerip

## Pyone Play Ripper

**Pyone Play Ripper** is a Node.js module that allows you to rip videos from [Pyone Play platform](https://www.pyoneplay.com/). It works by ~crawling the [Pyone Play website](https://www.pyoneplay.com/) using `Puppeteer`~ using the original site's endpoints to get the video stream, parsing the `H3U8` file, and downloading the .ts chunks using `wget`. The downloaded chunks are then merged into a single video using `ffmpeg`.

## Installation

To use Pyone Play Ripper, you'll need to have `Node.js`, `wget`, and `ffmpeg` installed on your system. You can install Node.js from [Nodejs.org](nodejs.org), `wget` from [gnu.org](gnu.org), and ffmpeg from [ffmpeg.org](ffmpeg.org).

## Usage

To use Pyone Play Ripper, you need to follow these steps:

1. Clone or download this repository to your local machine
2. Open a terminal and navigate to the project directory
3. Install the required dependencies by running npm install
4. Check the index.js file for usage details

The output directory and file name will be automatically generated based on the ID and resolution you provide
~ For example, to download a video with the ID "123456" and resolution "480p", you would run the following command:~

## Performance

To improve performance, you can try the following:

Increase the concurrency option to download more chunks simultaneously

- Use a faster internet connection or a server with higher bandwidth
- Use a faster machine or a machine with more cores for the ripping process
- Optimize ffmpeg settings to reduce the CPU and memory usage

## To-Do

- Improve error handling and error messages
- Implement a progress bar or other visual feedback for the download process
- ~ Add support for downloading subtitles or other video metadata ~
- ~ Implement automatic detection of the available resolutions for a given video ID ~
- ~ Add support for downloading multiple resolutions of the same video ID simultaneously ~

## License

Pyone Play Ripper is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
