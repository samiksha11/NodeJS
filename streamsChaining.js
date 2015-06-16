var fs = require("fs");
var zlib = require('zlib');

// Compress the file input.txt to input.txt.gz
fs.createReadStream('sampledata.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('sampledata.txt.gz'));
  
console.log("File Compressed.");