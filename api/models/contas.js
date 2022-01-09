'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      contas.hasMany(models.usuarios, {
        foreignKey: 'conta_id',
      })
      contas.hasMany(models.transacoes, {
        foreignKey: 'conta_origem'
      })
      contas.hasMany(models.transacoes, {
        foreignKey: 'conta_destino'
      })
    }
  };
  contas.init({
    numero: DataTypes.INTEGER,
    valor: {
      type: DataTypes.DECIMAL,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'contas',
  });
  return contas;
};