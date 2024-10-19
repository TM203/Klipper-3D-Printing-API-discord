const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');


ffmpeg.setFfmpegPath(ffmpegPath);

const { ymal } = require("../util/yaml-read")
const ymalConfig = ymal();

const KLIPPER_API_KEY = ymalConfig.KLIPPERAPIKEY;
const KLIPPER_BASE_URL = ymalConfig.KLIPPER_BASE_URL;

// Function to capture a screenshot
function captureWebcamFrame(webcamStreamUrl, screenshotPath) {
    return new Promise((resolve, reject) => {
        ffmpeg(webcamStreamUrl)
            .on('error', (err) => {
                console.error('Error capturing frame:', err.message);
                reject(err); 
            })
            .on('end', () => {
                console.log(`Screenshot saved to ${screenshotPath}`);
                resolve();
            })
        
            .screenshots({
                count: 1,
                folder: screenshotPath,
                filename: 'webcam_screenshot.jpg',
                timemarks: ['1']  // Capture the frame at 1 second
            });
    });
}

async function screenshot() {
    // Replace with the URL of your webcam stream
    const webcamStreamUrl = `${KLIPPER_BASE_URL}${ymalConfig.webcam_URL}`;

    // Define the output path for the captured frame
    const screenshotPath = path.join(__dirname, '../screenshots');

    try {
        // Await the screenshot capture
        await captureWebcamFrame(webcamStreamUrl, screenshotPath);
        console.log('Screenshot process completed successfully.');
    } catch (err) {
        console.error('Screenshot process failed:', err);
    }
}

module.exports = {
    screenshot
};
