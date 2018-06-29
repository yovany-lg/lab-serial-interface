const SerialPort = require('serialport');
const fs = require('fs');

var port = new SerialPort('/dev/serial0', { baudRate: 19200 }, function (err) {
  if (err) {
    return console.log('Error: ', err.message);
  }
  console.log('Serial port ready');
});

// setInterval(() => {
//   const data = port.read();
//   if(data !== null) {
//     console.log(data.toString() + '\n');
//     fs.appendFile('serial-logger.txt', data, (err) => {
//       if (err) throw err;
//       // console.log(`[Serial] -> New data ${data}`);
//     });
//   }
// }, 250);

port.write('Serial port running', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message);
  }
  console.log('message written');
});

port.on('data', function (data) {
  // const data = port.read();
  const str = data.toString();
  console.log('Serial Data:', data);
  fs.appendFile('serial-logger.txt', data, (err) => {
    if (err) throw err;
    // console.log(`[Serial] -> New data ${data}`);
  });
  // if (str.includes('\r')) {
  //   const lasFragment = str.split('\r');
  //   frame = frameParts.concat(lasFragment[0]);
  //   // console.log(frame);
  //   frameParts = lasFragment[1];
  // } else {
  //   frameParts = frameParts.concat(str);
  // }
});
