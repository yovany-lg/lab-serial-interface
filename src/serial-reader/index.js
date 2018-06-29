const SerialPort = require('serialport');
const Led = require('robotois-ws2811');
const frameReader = require('./frame-reader')();

const led = new Led(1, 1, 64, 1);
const colors = {
  primary: '#00d1b2',
  link: '#3273dc',
  info: '#209cee',
  success: '#23d160',
  warning: '#ffdd57',
  error: '#ff3860',
};
let ledTimeout = false;
let port;

const init = (recordCreator) => {
  port = new SerialPort('/dev/serial0', function (err) {
    if (err) {
      return console.log('Error: ', err.message);
    }
    console.log('Serial port ready');
    led.turnOn(colors.success);
  });

  port.on('data', function (data) {
    led.turnOn(colors.warning);
    if(!ledTimeout) {
      ledTimeout = setTimeout(() => {
        led.turnOn(colors.success);
        clearTimeout(ledTimeout);
        ledTimeout = false;
      }, 5000);
    }
    const str = data.toString();
    const frame = frameReader.buildFrame(str);
    // console.log('Data:', str);

    if (frame) {
      console.log('format1:', frame.format1.length, 'format2:', frame.format2.length);
      recordCreator(frame);
    }
  });
};

function release() {
  led.turnOff();
  port.close();
}
process.on('SIGINT', () => {
  release();
  process.exit();
});

process.on('SIGTERM', () => {
  release();
  process.exit();
});

process.on('exit', () => {
  release();
  process.exit();
});

module.exports = init;
