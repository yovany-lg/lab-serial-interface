const fs = require('fs');
var SerialPort = require('serialport');

/*
  Run from another computer to test receiving data from Serial port
*/
const openPort = () => new Promise((resolve, reject) => {
  const port = new SerialPort('/dev/ttyUSB0', function (err) {
    if (err) {
      reject(err);
      return console.log('Error: ', err.message);
    }
    console.log('Serial port ready');
    resolve(port);
  });
})

openPort().then((port) => {
  // console.log(port);
  fs.readFile('../serial-logger.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
    port.write(data, (err) => {
      if (err) {
        console.error('[Serial Port] -> write error!');
        return;
      }
      console.log('[Serial Port] -> data written');
    });
    // console.log(data);
    // const lines = data.split('\r');
    // console.log(lines.length);
  });
});
