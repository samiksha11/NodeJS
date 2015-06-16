var fs = require("fs");
console.log("program started");
var data = fs.readFileSync('sampledata.txt');

console.log(data.toString());
console.log("Program Ended");