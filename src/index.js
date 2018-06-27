const recordCreator = require('./record-creator');
const serialReader = require('./serial-reader');
const digitalIO = require('robotois-digital-io');
const command = require('./commands');

const button = digitalIO(17);
button.addFunction((secs, ms) => (secs >= 1), () => {
   console.log('[SuperToi] -> Shutdown');
   command('sudo shutdown -h now');
});

serialReader(recordCreator);
