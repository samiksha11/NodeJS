var buf1 = new Buffer(256);
len = buf1.write("Simply Easy Learning");

console.log("Octets written : "+  len);
var buf2 = new Buffer(26);
for (var i = 0 ; i < 26 ; i++) {
  buf2[i] = i + 97;
}

console.log( buf2.toString('ascii'));       // outputs: abcdefghijklmnopqrstuvwxyz
console.log( buf2.toString('ascii',0,5));   // outputs: abcde
console.log( buf2.toString('utf8',0,5));    // outputs: abcde
console.log( buf2.toString(undefined,0,5)); // encoding defaults to 'utf8', outputs abcde

var buf3 = new Buffer('Simply Easy Learning');
var json = buf3.toJSON(buf3);

console.log(json);

var buffer1 = new Buffer('ABC');
var buffer2 = new Buffer('ABCD');
var result = buffer1.compare(buffer2);

if(result < 0) {
   console.log(buffer1 +" comes before " + buffer2);
}else if(result === 0){
   console.log(buffer1 +" is same as " + buffer2);
}else {
   console.log(buffer1 +" comes after " + buffer2);
}

var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 content: " + buffer3.toString());



//copy a buffer
var buffer4 = new Buffer(3);
buffer1.copy(buffer2);
console.log("buffer4 content: " + buffer2.toString());


var buffer5 = new Buffer('TutorialsPoint');
//slicing a buffer
var buffer6 = buffer5.slice(0,9);
console.log("buffer5 content: " + buffer6.toString());


var buffer7 = new Buffer('TutorialsPoint');
//length of the buffer
console.log("buffer length: " + buffer7.length);