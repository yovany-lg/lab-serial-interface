const moment = require('moment');
const valid = (frame, frameArr) => (
  frame.includes('GLU') &&
  frame.includes('Multistix') &&
  !frame.includes('No introducido') &&
  frameArr.length === 42
);

const testResults = (frame) => ({
  consecutive: Number(frame[0]),
  datetime: moment(`${frame[1]} ${frame[2]}`, 'DD-MM-YYYY hh:mm'),
  patient_id: frame[4],
  test_type: frame[9],
  color: frame[10],
  aspect: frame[11],
  glucosa: `${frame[13]} ${frame[14]}`.trim(),
  bilirrubina: `${frame[16]} ${frame[17]}`.trim(),
  cetona: `${frame[19]} ${frame[20]}`.trim(),
  densidad: `${frame[22]} ${frame[23]}`.trim(),
  sangre: `${frame[25]} ${frame[26]}`.trim(),
  ph: `${frame[28]} ${frame[29]}`.trim(),
  proteina: `${frame[31]} ${frame[32]}`.trim(),
  urobilinogeno: `${frame[34]} ${frame[35]}`.trim(),
  nitritos: `${frame[37]} ${frame[38]}`.trim(),
  leucocitos: `${frame[40]} ${frame[41]}`.trim(),
});

const frameParser = (frame) => {
  const frameArr = frame.trim().split(',');
  if (!valid(frame, frameArr)) {
    console.log('Invalid Frame:', frame);
    return undefined;
  }
  // const frameData = frameTr.split(',');
  const recordInfo = testResults(frameArr);
  // console.log(recordInfo);
  return recordInfo;
}

module.exports = frameParser;
//
// const testStr = `1492,14-06-2018,10:40,06178,67634,,,,,Multistix 10 SG,Amarillo,Otros,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.020,,SAN,Negativo,,pH ,6.5,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1491,14-06-2018,10:37,06178,67633,,,,,Multistix 10 SG,Amarillo,Claro,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.015,,SAN,Negativo,,pH ,5.5,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1490,14-06-2018,10:35,06178,67628,,,,,Multistix 10 SG,Amarillo,Otros,GLU,Negativo,,BIL,Negativo,,CET,15 mg/dL,*,DEN,>=1.030,,SAN,Negativo,,pH ,5.0,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1489,14-06-2018,10:34,06178,67627,,,,,Multistix 10 SG,Amarillo,Claro,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.015,,SAN,Negativo,,pH ,6.0,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1488,14-06-2018,10:32,06178,67623,,,,,Multistix 10 SG,Amarillo,Claro,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.015,,SAN,Negativo,,pH ,5.0,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Apr 125 Leu/uL,*
// 1487,14-06-2018,10:31,06178,67623,,,,,Multistix 10 SG,No introducido,No introducido,E58
// 1486,14-06-2018,10:31,06178,67623,,,,,Multistix 10 SG,No introducido,No introducido,E60
// 1485,14-06-2018,10:29,06178,67622,,,,,Multistix 10 SG,Amarillo,Algo turbio,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.020,,SAN,Ind.Hemoliz.,*,pH ,5.0,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Apr 15 Leu/uL,*`;
//
// const test = () => {
//   const frames = testStr.split('\n');
//   // console.log(frames);
//   frames.map(frameParser);
// }
//
// test();
