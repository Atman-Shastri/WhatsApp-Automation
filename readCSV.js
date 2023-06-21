const fs = require('fs');
const csv = require('csv-parser');

// Define the path to your CSV file
const csvFilePath = "./WhatsApp Automation.csv";
var csvContents = [];
// Read the CSV file and process its contents
fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
        // Process each row of the CSV
        // console.log(row);
        const values = Object.values(row);
        const hasValues = values.some((value) => value.trim() !== ''); // Check if any value is non-blank

        if (hasValues) {
          csvContents.push(row);
        }
    })
    .on('end', () => {
        // CSV parsing is complete
        console.log('CSV file successfully processed.');
        // console.log(csvContents)
        // module.exports = csvContents;
        const jsonFilePath = './csvFile.json';
        fs.writeFile(jsonFilePath, JSON.stringify(csvContents, null, 2), (error) => {
          if (error) {
            console.error('Error while exporting CSV data to JSON:', error);
          } else {
            console.log('CSV data successfully exported to JSON:', jsonFilePath);
          }
        });
      })
    .on('error', (error) => {
        // Handle any error that occurred during parsing
        console.error('Error while parsing CSV file:', error);
    });


