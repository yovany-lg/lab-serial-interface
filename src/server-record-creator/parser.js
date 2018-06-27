const moment = require('moment');
const valid = (frame, frameArr) => (
  frame.includes('GLU') &&
  frame.includes('Multistix') &&
  !frame.includes('No introducido') &&
  frameArr.length === 42
);

const resultParser = (res, obs) => {
  const obj = {};
  if(res.includes('/')) {
    const resultSplit = res.split(' ');
    obj.Resultado = resultSplit.length == 2 ? resultSplit[0] : `${resultSplit[0]} ${resultSplit[1]}`;
    obj.Unidades = resultSplit.length == 2 ? resultSplit[1] : resultSplit[2];
    obj.Observacion = obs;
  } else {
    obj.Resultado = res
    obj.Observacion = obs;
  }
  return obj;
};

const testResults = (frame) => ({
  // consecutive: Number(frame[0]),
  Fecha_Hora: moment(`${frame[1]} ${frame[2]}`, 'DD-MM-YYYY hh:mm'),
  No_Identificacion: frame[4],
  // test_type: frame[9],
  tests: [
    {
      Test: 'Color',
      Observacion: frame[10].includes('Marr') ? 'Marrón' : frame[10]
    },
    {
      Test: 'Aspecto',
      Observacion: frame[11],
    },
    {
      Test: 'Glucosa',
      ...resultParser(frame[13], frame[14]),
    },
    {
      Test: 'Bilirubina',
      ...resultParser(frame[16], frame[17]),
    },
    {
      Test: 'Cetona',
      ...resultParser(frame[19], frame[20]),
    },
    {
      Test: 'Densidad',
      ...resultParser(frame[22], frame[23]),
    },
    {
      Test: 'Sangre',
      ...resultParser(frame[25], frame[26]),
    },
    {
      Test: 'pH',
      ...resultParser(frame[28], frame[29]),
    },
    {
      Test: 'Proteina',
      ...resultParser(frame[31], frame[32]),
    },
    {
      Test: 'Urobilinogeno',
      ...resultParser(frame[34], frame[35]),
    },
    {
      Test: 'Nitritos',
      ...resultParser(frame[37], frame[38]),
    },
    {
      Test: 'Leucocitos',
      ...resultParser(frame[40], frame[41]),
    },
  ],
  // glucosa: `${frame[13]} ${frame[14]}`.trim(),
  // bilirrubina: `${frame[16]} ${frame[17]}`.trim(),
  // cetona: `${frame[19]} ${frame[20]}`.trim(),
  // densidad: `${frame[22]} ${frame[23]}`.trim(),
  // sangre: `${frame[25]} ${frame[26]}`.trim(),
  // ph: `${frame[28]} ${frame[29]}`.trim(),
  // proteina: `${frame[31]} ${frame[32]}`.trim(),
  // urobilinogeno: `${frame[34]} ${frame[35]}`.trim(),
  // nitritos: `${frame[37]} ${frame[38]}`.trim(),
  // leucocitos: `${frame[40]} ${frame[41]}`.trim(),
});

const frameParser = (frame) => {
  const frameArr = frame.trim().split(',');
  if (!valid(frame, frameArr)) {
    console.log('Invalid Frame:', frame);
    return undefined;
  }
  const recordInfo = testResults(frameArr);
  // console.log(recordInfo);
  return recordInfo;
}

module.exports = frameParser;

// const testStr = `1596,18-06-2018,15:25,06178,,,,,,Multistix 10 SG,Amarillo,Claro,GLU,500 mg/dL,*,BIL,Alto,*,CET,15 mg/dL,*,DEN,1.020,,SAN,Apr 200 Hem/uL,*,pH ,7.0,,PRO,>=300 mg/dL,*,URO,4.0 E.U./dL,*,NIT,Positivo,*,LEU,Apr 500 Leu/uL,*
// 1595,18-06-2018,11:31,06178,67932,,,,,Multistix 10 SG,Amarillo,Algo turbio,GLU,Negativo,,BIL,Bajo,*,CET,80 mg/dL,*,DEN,1.020,,SAN,Negativo,,pH ,6.5,,PRO,30 mg/dL,*,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1594,18-06-2018,11:29,06178,67929,,,,,Multistix 10 SG,Amarillo,Claro,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.020,,SAN,Negativo,,pH ,5.5,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1593,18-06-2018,11:28,06178,67925,,,,,Multistix 10 SG,Amarillo,Turbio,GLU,500 mg/dL,*,BIL,Bajo,*,CET,15 mg/dL,*,DEN,1.020,,SAN,Negativo,,pH ,5.5,,PRO,30 mg/dL,*,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Apr 15 Leu/uL,*
// 1592,18-06-2018,11:26,06178,67924,,,,,Multistix 10 SG,Amarillo,Otros,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.020,,SAN,Negativo,,pH ,5.0,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Apr 15 Leu/uL,*
// 1591,18-06-2018,11:25,06178,67920,,,,,Multistix 10 SG,Amarillo,Claro,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.010,,SAN,Negativo,,pH ,5.5,,PRO,30 mg/dL,*,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1590,18-06-2018,11:23,06178,67920,,,,,Multistix 10 SG,Amarillo,Claro,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.010,,SAN,Negativo,,pH ,5.5,,PRO,30 mg/dL,*,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1589,18-06-2018,11:22,06178,67918,,,,,Multistix 10 SG,Amarillo,Claro,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.015,,SAN,Negativo,,pH ,5.5,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1588,18-06-2018,11:20,06178,67912,,,,,Multistix 10 SG,Amarillo,Turbio,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,<=1.005,,SAN,Apr 80 Hem/uL,*,pH ,5.5,,PRO,30 mg/dL,*,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1587,18-06-2018,11:19,06178,67911,,,,,Multistix 10 SG,Amarillo,Claro,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.025,,SAN,Negativo,,pH ,5.5,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Apr 15 Leu/uL,*
// 1586,18-06-2018,11:17,06178,67910,,,,,Multistix 10 SG,Amarillo,Turbio,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.015,,SAN,Negativo,,pH ,7.0,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Positivo,*,LEU,Apr 125 Leu/uL,*
// 1585,18-06-2018,11:15,06178,67905,,,,,Multistix 10 SG,Amarillo,Claro,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.010,,SAN,Negativo,,pH ,5.5,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1584,18-06-2018,11:14,06178,67890,,,,,Multistix 10 SG,Amarillo,Claro,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.015,,SAN,Negativo,,pH ,6.0,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1583,18-06-2018,11:12,06178,67850,,,,,Multistix 10 SG,Amarillo,Claro,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.015,,SAN,Ind.Intactos,*,pH ,5.5,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Apr 15 Leu/uL,*
// 1582,18-06-2018,11:11,06178,67844,,,,,Multistix 10 SG,Amarillo,Claro,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,<=1.005,,SAN,Negativo,,pH ,5.5,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1581,18-06-2018,10:58,06178,67901,,,,,Multistix 10 SG,Amarillo,Claro,GLU,100 mg/dL,*,BIL,Negativo,,CET,Negativo,,DEN,1.010,,SAN,Negativo,,pH ,5.5,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Apr 15 Leu/uL,*
// 1580,18-06-2018,10:47,06178,67900,,,,,Multistix 10 SG,Amarillo,Algo turbio,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.015,,SAN,Negativo,,pH ,6.5,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1579,18-06-2018,10:45,06178,67896,,,,,Multistix 10 SG,Amarillo,Algo turbio,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.020,,SAN,Negativo,,pH ,6.5,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1578,18-06-2018,10:44,06178,67893,,,,,Multistix 10 SG,Amarillo,Algo turbio,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,<=1.005,,SAN,Negativo,,pH ,6.0,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Apr 500 Leu/uL,*
// 1577,18-06-2018,10:42,06178,67888,,,,,Multistix 10 SG,Amarillo,Algo turbio,GLU,>=1000 mg/dL,*,BIL,Negativo,,CET,Negativo,,DEN,1.015,,SAN,Negativo,,pH ,5.5,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1576,18-06-2018,10:41,06178,67883,,,,,Multistix 10 SG,Amarillo,Claro,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.015,,SAN,Negativo,,pH ,5.5,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1575,18-06-2018,10:38,06178,67881,,,,,Multistix 10 SG,Amarillo,Turbio,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.020,,SAN,Apr 25 Hem/uL,*,pH ,6.5,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Positivo,*,LEU,Apr 15 Leu/uL,*
// 1574,18-06-2018,10:36,06178,67880,,,,,Multistix 10 SG,Amarillo,Claro,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,<=1.005,,SAN,Negativo,,pH ,6.0,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Apr 15 Leu/uL,*
// 1573,18-06-2018,10:34,06178,67862,,,,,Multistix 10 SG,Amarillo,Algo turbio,GLU,100 mg/dL,*,BIL,Negativo,,CET,Negativo,,DEN,1.015,,SAN,Negativo,,pH ,6.0,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1572,18-06-2018,10:30,06178,67860,,,,,Multistix 10 SG,Amarillo,Algo turbio,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,<=1.005,,SAN,Negativo,,pH ,5.5,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Apr 70 Leu/uL,*
// 1571,18-06-2018,08:52,06178,CONTROL-2,,,,,Multistix 10 SG,Marrón,Turbio,GLU,500 mg/dL,*,BIL,Alto,*,CET,15 mg/dL,*,DEN,1.020,,SAN,Apr 200 Hem/uL,*,pH ,7.0,,PRO,>=300 mg/dL,*,URO,4.0 E.U./dL,*,NIT,Positivo,*,LEU,Apr 500 Leu/uL,*
// 1570,18-06-2018,08:46,06178,CONTROL-1,,,,,Multistix 10 SG,Amarillo,Claro,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.010,,SAN,Negativo,,pH ,6.0,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1569,17-06-2018,10:45,06178,67861,,,,,Multistix 10 SG,Amarillo,Claro,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.015,,SAN,Apr 80 Hem/uL,*,pH ,6.5,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1568,17-06-2018,10:45,06178,67861,,,,,Multistix 10 SG,No introducido,No introducido,E58
// 1567,17-06-2018,09:46,06178,67857,,,,,Multistix 10 SG,Amarillo,Claro,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.010,,SAN,Negativo,,pH ,6.5,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Apr 125 Leu/uL,*
// 1566,17-06-2018,09:44,06178,67848,,,,,Multistix 10 SG,Amarillo,Claro,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.020,,SAN,Negativo,,pH ,6.0,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1565,17-06-2018,09:43,06178,67832,,,,,Multistix 10 SG,Amarillo,Claro,GLU,Negativo,,BIL,Negativo,,CET,Indicios,*,DEN,1.020,,SAN,Negativo,,pH ,6.0,,PRO,100 mg/dL,*,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1564,17-06-2018,09:16,06178,67854,,,,,Multistix 10 SG,Amarillo,Claro,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.020,,SAN,Ind.Intactos,*,pH ,5.5,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1563,17-06-2018,09:14,06178,67849,,,,,Multistix 10 SG,Amarillo,Claro,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.015,,SAN,Negativo,,pH ,8.0,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Apr 125 Leu/uL,*
// 1562,17-06-2018,09:13,06178,67847,,,,,Multistix 10 SG,Amarillo,Claro,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.020,,SAN,Negativo,,pH ,5.5,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1561,17-06-2018,09:11,06178,67837,,,,,Multistix 10 SG,Amarillo,Claro,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.020,,SAN,Apr 25 Hem/uL,*,pH ,7.0,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1560,16-06-2018,12:36,06178,67668,,,,,Multistix 10 SG,Amarillo,Algo turbio,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.025,,SAN,Negativo,,pH ,6.0,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Negativo,
// 1559,16-06-2018,10:59,06178,67819,,,,,Multistix 10 SG,Amarillo,Turbio,GLU,Negativo,,BIL,Negativo,,CET,15 mg/dL,*,DEN,1.015,,SAN,Apr 80 Hem/uL,*,pH ,5.5,,PRO,100 mg/dL,*,URO,0.2 E.U./dL,,NIT,Positivo,*,LEU,Apr 125 Leu/uL,*
// 1558,16-06-2018,10:54,06178,67814,,,,,Multistix 10 SG,Amarillo,Algo turbio,GLU,Negativo,,BIL,Negativo,,CET,Negativo,,DEN,1.015,,SAN,Negativo,,pH ,7.0,,PRO,Negativo,,URO,0.2 E.U./dL,,NIT,Negativo,,LEU,Apr 70 Leu/uL,*
// `;
//
// const test = () => {
//   const frames = testStr.split('\n');
//   // console.log(frames);
//   frames.map(frameParser);
// }
//
// test();
