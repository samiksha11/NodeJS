var fs = require("fs");
var zlib = require('zlib');

// Decompress the file input.txt.gz to input.txt
fs.createReadStream('sampledata.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('sampledata.txt'));
  
console.log("File Decompressed.");