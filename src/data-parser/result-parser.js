const roundedPercent = require('./round-percent');
const translations = require('./translations');

const round = (number, precision) => {
  const shift = function (number, precision, reverseShift) {
    if (reverseShift) {
      precision = -precision;
    }
    const numArray = ("" + number).split("e");
    return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
  };
  return shift(Math.round(shift(number, precision, false)), precision, true);
}

const testsRules = [
  {
    test: 'WBC',
    indexPos: [48, 5],
    factor: 1/100,
    units: 'x10E3/uL',
    range: [4.5, 10],
  },
  {
    test: 'RBC',
    indexPos: [54, 4],
    factor: 1/100,
    units: 'x10E6/uL',
    range: [4.0, 6.20],
  },
  {
    test: 'HGB',
    indexPos: [59, 4],
    factor: 1/10,
    units: 'g/dL',
    range: [11.8, 18.8],
  },
  {
    test: 'HCT',
    indexPos: [64, 4],
    factor: 1/10,
    units: '%',
    range: [37.7, 55.0],
  },
  {
    test: 'MCV',
    indexPos: [69, 4],
    factor: 1/10,
    units: 'fL',
    range: [82, 99],
  },
  {
    test: 'MCH',
    indexPos: [74, 4],
    factor: 1/10,
    units: 'pg/cel',
    range: [27, 34],
  },
  {
    test: 'MCHC',
    indexPos: [79, 4],
    factor: 1/10,
    units: 'g/dL',
    range: [30, 36],
  },
  {
    test: 'PLT',
    indexPos: [84, 4],
    factor: 1,
    units: 'x10E3/uL',
    range: [150, 450],
  },
  {
    test: 'RDW-CV',
    indexPos: [144, 4],
    factor: 1/10,
    units: '%',
    range: [11.5, 15],
  },
  {
    test: 'MPV',
    indexPos: [159, 4],
    factor: 1/10,
    units: 'fL',
    range: [7.4, 11],
  },
];

const percentTestsRules = [
  {
    test: 'LYMPH',
    indexPos: [89, 4],
    factor: 1/10,
    units: '%',
    range: [25, 50],
  },
  {
    test: 'MONO',
    indexPos: [94, 4],
    factor: 1/10,
    units: '%',
    range: [2, 10],
  },
  {
    test: 'NEUT',
    indexPos: [99, 4],
    factor: 1/10,
    units: '%',
    range: [50, 80],
  },
  {
    test: 'EO',
    indexPos: [104, 4],
    factor: 1/10,
    units: '%',
    range: [1, 4],
  },
  {
    test: 'BASO',
    indexPos: [109, 4],
    factor: 1/10,
    units: '%',
    range: [0, 1],
  },
]

const testsInfo = (data, rules) => {
  const tests = rules.map((rule) => {
    const intValue = Number.parseInt(data.substr(rule.indexPos[0], rule.indexPos[1]));
    const result = round(intValue * rule.factor, 2);
    let obs;
    switch (true) {
      case result < rule.range[0]:
        obs = '*Bajo';
        break;
      case result > rule.range[1]:
        obs = '*Alto';
        break;
      default:
        obs = 'Normal';
    }
    const obj = {
      Test: translations[rule.test],
      Resultado: result,
      Unidades: rule.units,
      Observacion: obs,
    };
    return obj;
  });
  return tests;
}

const testsBuilder = (data) => {
  const normalResults = testsInfo(data, testsRules);
  const specialResults = testsInfo(data, percentTestsRules);
  const percents = specialResults.map(res => res.Resultado);
  const newPercents = roundedPercent(percents, 100);
  const newSpecialResults = specialResults.map((res, idx) => ({
    ...res,
    Resultado: newPercents[idx],
  }));
  // console.log(roundedPercent(percents, 100));
  return normalResults.concat(newSpecialResults);
}

module.exports = testsBuilder;
