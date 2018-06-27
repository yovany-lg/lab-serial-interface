const Sequelize = require('sequelize');

const Record = (sequelize) => {
  const model = sequelize.define('records', {
    consecutive: Sequelize.INTEGER,
    datetime: Sequelize.DATE,
    patient_id: Sequelize.STRING,
    test_type: Sequelize.STRING,
    color: Sequelize.STRING,
    aspect: Sequelize.STRING,
    glucosa: Sequelize.STRING,
    bilirrubina: Sequelize.STRING,
    cetona: Sequelize.STRING,
    densidad: Sequelize.STRING,
    sangre: Sequelize.STRING,
    ph: Sequelize.STRING,
    proteina: Sequelize.STRING,
    urobilinogeno: Sequelize.STRING,
    nitritos: Sequelize.STRING,
    leucocitos: Sequelize.STRING,
  });
  model.sync({ force: true });
  return model;
};

module.exports = Record;
