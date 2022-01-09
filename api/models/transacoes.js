'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transacoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      transacoes.belongsTo(models.contas, {
        foreignKey: 'conta_origem', as: "contaOrigem"
      })
      transacoes.belongsTo(models.contas, {
        foreignKey: 'conta_destino', as: "contaDestino"
      })
    }
  };
  transacoes.init({
    tipo: DataTypes.STRING,
    conta_origem: DataTypes.INTEGER,
    conta_destino: DataTypes.INTEGER,
    valor: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'transacoes',
    freezeTableName: true
  });
  return transacoes;
};