const http = require('http');
const https = require('https');
const fs = require('fs');

const fileUrl = 'https://docs.google.com/spreadsheets/d/1i_L4o8yJKnTEPxSA-DIh2auzdPJhP_otg-qZpzshV8s/export?format=csv&gid=0';
const downloadPath = './WhatsApp Automation.csv';

function downloadFile(url, path) {
    const protocol = url.startsWith('https') ? https : http;

    const file = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
        protocol.request(url, response => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                return downloadFile(response.headers.location, path)  // Handle redirect
                    .then(resolve)
                    .catch(reject);
            }

            response.pipe(file);
            file.on('finish', () => {
                file.close(() => {
                    resolve();
                });
            });
        }).on('error', err => {
            fs.unlinkSync(path);
            reject(err);
        }).end();
    });
}

downloadFile(fileUrl, downloadPath)
    .then(() => {
        console.log('File downloaded successfully.');
        process.exit(0);
    })
    .catch(error => {
        console.error('Error occurred while downloading:', error);
        process.exit(1);
    });
