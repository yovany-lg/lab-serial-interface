var SerialPort = require('serialport');
const fs = require('fs');
var port = new SerialPort('/dev/serial0', function (err) {
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

// port.write('Serial port running', function(err) {
//   if (err) {
//     return console.log('Error on write: ', err.message);
//   }
//   console.log('message written');
// });
// Read data that is available but keep the stream from entering "flowing mode"
port.on('data', function (data) {
  // const data = port.read();
  console.log('Data:', data);
  // fs.appendFile('serial-logger.txt', data, (err) => {
  //   if (err) throw err;
  //   // console.log(`[Serial] -> New data ${data}`);
  // });
});
