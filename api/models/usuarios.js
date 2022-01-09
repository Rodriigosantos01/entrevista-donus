'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      usuarios.belongsTo(models.status, {
        foreignKey: 'status_id'
      })
      usuarios.belongsTo(models.contas, {
        foreignKey: 'conta_id'
      })
    }
  };
  usuarios.init({
    nome: DataTypes.STRING,
    cpf: DataTypes.STRING,
    conta_id: DataTypes.INTEGER,
    status_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
    
  }, {
    sequelize,
    modelName: 'usuarios',
  });
  return usuarios;
};