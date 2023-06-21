const fs = require('fs');
const path = require('path');

module.exports = function (logFilePath) {
  // Create a write stream to the log file
  const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

  // Save the original console.log function
  const originalConsoleLog = console.log;

  // Override console.log to write to the log file
  console.log = function (message) {
    // Write the log message to the file
    logStream.write(message + '\n');

    // Also, log to the original console.log
    originalConsoleLog.apply(console, arguments);
  };

  // Close the log stream when the program exits
  process.on('exit', () => {
    logStream.end();
  });
};
