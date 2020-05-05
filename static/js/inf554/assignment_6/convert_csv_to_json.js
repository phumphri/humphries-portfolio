let csvToJson = require('convert-csv-to-json');
 
var fileInputName = './static/csv/inf554/assignment_6/data.csv'; 
var fileOutputName = './static/json/inf554/assignment_6/data.json';
 
csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(fileInputName,fileOutputName);

fileInputName = './static/csv/inf554/assignment_6/metadata.csv'; 
fileOutputName = './static/json/inf554/assignment_6/metadata.json';
 
csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(fileInputName,fileOutputName);
