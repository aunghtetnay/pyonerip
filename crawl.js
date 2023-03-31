import puppeteer from 'puppeteer'

export default async function crawl(pyonePlayVideoPageUrl) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(pyonePlayVideoPageUrl)
    console.log('reached here')
    // await page.waitForFrame('iframe')
    console.log('iframe loaded')
    const iframe = await page.waitForSelector('iframe')
    const frame = await iframe.contentFrame()
    await frame.waitForSelector('video')

    // Evaluate the video element and extract the src attribute value of the source tag
    const src = await frame.evaluate(() => {
        const video = document.querySelector('video');
        const source = video.querySelector('source[type="application/x-mpegURL"]');
        return source.getAttribute('src');
    });

    await browser.close();

    return src
}