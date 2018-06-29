const Sequelize = require('sequelize');

const Record = (sequelize) => {
  const model = sequelize.define('RESULTADOSSYSMEX', {
    ID_Resultado: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    Fecha_Hora: Sequelize.DATE,
    No_Identificacion: Sequelize.STRING,
    Test: Sequelize.STRING,
    Resultado: Sequelize.STRING,
    Unidades: Sequelize.STRING,
    Observacion: Sequelize.STRING,
  }, {
    timestamps: false,
    freezeTableName: true,
  });
  // model.sync({ force: true });
  model.sync();
  return model;
};

module.exports = Record;
