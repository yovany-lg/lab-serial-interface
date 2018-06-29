const moment = require('moment');
const resultParser = require('./result-parser');

const validFormat = (frame) => (
  frame.format1.length === 191 && frame.format2.length === 255
);

const validInfo = (frame) => (
  frame.No_Identificacion !== '' &&
  !frame.Observacion.includes('QC')
);

const sampleResult = (digit) => {
  switch (digit) {
    case '0':
      return 'Negativo';
    case '1':
      return 'Positivo';
    case '2':
      return 'Error';
    case '3':
      return 'Positivo+Error';
    // case 'Q':
      // return 'QC Data';
    default:
      return 'QC Data';
  }
}

const basicInfo = (frame) => {
  const f1 = frame.format1;
  return {
    Fecha_Hora: moment(
      `${f1.substr(48, 4)}-${f1.substr(52,2)}-${f1.substr(54,2)} ${f1.substr(56, 2)}:${f1.substr(58,2)}`,
      'YYYY-MM-DD hh:mm'),
    No_Identificacion: f1.substr(72,16).trim(),
    Observacion: sampleResult(f1[89]),
  };
};

const frameParser = (frame) => {
  if (!validFormat(frame)) {
    console.log('Invalid Frame:', frame.format1);
    return undefined;
  }
  const basic = basicInfo(frame);
  if (!validInfo(basic)) {
    console.log('Invalid Frame:', frame.format1);
    return undefined;
  }
  const tests = resultParser(frame.format2);
  const recordInfo = {
    ...basic,
    tests
  };
  return recordInfo;
}

module.exports = frameParser;
