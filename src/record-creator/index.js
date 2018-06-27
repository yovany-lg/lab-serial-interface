const Sequelize = require('sequelize');
const record = require('./model');
const parser = require('./parser');

const sequelize = new Sequelize('clinitek', 'admin', 'yovanylg', {
  dialect: 'mysql',
  logging: false,
})

const Record = record(sequelize);

const getRecord = (recordInfo) => Record.findOne({
    where: { patient_id: recordInfo.patient_id, consecutive: recordInfo.consecutive }
  }).then((record) => {
      return !record ? Record.create({ ...recordInfo }) : record;
  });


const recordCreator = (frame) => new Promise(function(resolve, reject) {
  const recordInfo = parser(frame);
  if (recordInfo) {
    getRecord(recordInfo).then((record) => {
      // console.log(record);
      resolve(true);
    });
    return;
  }
  resolve(false);
});

module.exports= recordCreator;

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
//   frames.map(recordCreator);
// }
//
// test();
