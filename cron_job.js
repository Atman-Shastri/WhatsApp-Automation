const cron = require('node-cron');
const { exec } = require('child_process');

// Define the cron schedule using cron syntax (e.g., run every day at 8:00 AM)
const cronSchedule = '00 14 * * *';

// Define the function to restart your Node.js project
function restartProject() {
  console.log('Restarting the Node.js project...');
  exec('npm start', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error occurred while restarting: ${error.message}`);
    } else {
      console.log(`Restart completed successfully. Output: ${stdout}`);
    }
  });
}

// Schedule the cron job
cron.schedule(cronSchedule, restartProject);
