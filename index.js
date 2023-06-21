const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const { Client, Location, List, Buttons, LocalAuth } = require('whatsapp-web.js');
const csvContents = require('./csvFile.json');
const logToTxt = require('./log_to_txt');
const logFilePath = path.join(__dirname, 'logs.txt');
logToTxt(logFilePath);

var phones = csvContents.map(v => v['Phone Number'])
var names = csvContents.map(v => v['Name'])
var dates = csvContents.map(v => v['TimeStamp'])
var messages = csvContents.map(v => v['Message'])

const today = new Date();
today.getTime();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const options = { timeZone: 'Asia/Kolkata' };
const timeString = today.toLocaleString('en-US', options);
const currentDate = `${day}/${month}/${year}`;
console.log("Date: " + currentDate)
// Path where the session data will be stored
const SESSION_FILE_PATH = './session.json';

// Load the session data if it has been previously saved
let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

// Use the saved values
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
    for (var i = 0; i < csvContents.length; i++) {
        if (dates[i] === currentDate.toString()) {
            console.log("Sent Message to: " + names[i]);
            client.sendMessage(phones[i], messages[i]);
            console.log("Finished Sending Messages " + (i + 1) + " on " + `${timeString}`);
        }
    }
});

client.initialize();

setTimeout(() => {
    console.log("Halting before closing");
    process.exit(0);
}, 60000)
