var SerialPort = require('serialport');
const Led = require('robotois-ws2811');

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
  let frameParts = '';
  let frame;

  port = new SerialPort('/dev/serial0', function (err) {
    if (err) {
      return console.log('Error: ', err.message);
    }
    console.log('Serial port ready');
    led.turnOn(colors.success);
  });
  port.on('data', function (data) {
    led.blink(colors.info);
    if(!ledTimeout) {
      ledTimeout = setTimeout(() => {
        led.turnOn(colors.success);
        clearTimeout(ledTimeout);
        ledTimeout = false;
      }, 5000);
    }
    const str = data.toString();
    if (str.includes('\r')) {
      const lasFragment = str.split('\r');
      frame = frameParts.concat(lasFragment[0]);
      recordCreator(frame);
      // .then(() => {
      //   led.turnOn(colors.success);
      // });
      // console.log(frame);
      frameParts = lasFragment[1];
    } else {
      frameParts = frameParts.concat(str);
    }
  });
};

process.on('exit', () => {
  led.turnOff();
  port.close();
  process.exit();
});

module.exports = init;
