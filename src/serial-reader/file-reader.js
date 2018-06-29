const fs = require('fs');
const frameReader = require('./frame-reader')();
const parser = require('../data-parser/parser');

fs.readFile('68492.txt', (err, data) => {
  if (err) throw err;
  const str = data.toString();
  let chunk = 0;
  const step = 30;
  while(chunk <= str.length) {
    const chunkData = str.substring(chunk, chunk+step);
    const frame = frameReader.buildFrame(chunkData);
    if(frame) {
      const parsed = parser(frame);
      if (parsed) {
        console.log('Frame: ',parsed);
      }
    }
    chunk = chunk + step;
  }
});
