// Libs
const database = require("../models");
const Sequelize = require("sequelize");

const Op = Sequelize.Op;
const status = {
  ativo: 1,
  inativo: 2,
  deletado: 3,
};

class UserModel {
  static async getAll() {
    try {
      const usuarios = await database.usuarios.findAll({
        where: {
          status_id: {
            [Op.not]: status.deletado,
          },
        },
        include: [
          { model: database.status },
          { model: database.contas },
        ],
      });

      return usuarios;
    } catch (error) {
      throw error;
    }
  }

  static async getByCPF(cpf) {
    try {
      const usuario = await database.usuarios.findOne({
        where: {
          cpf: cpf,
          status_id: {
            [Op.not]: status.deletado,
          },
        },
        include: [
          { model: database.status },
          { model: database.contas },
        ],
      });
      return usuario;
    } catch (error) {
      throw error;
    }
  }

  static async getByID(id) {
    try {
      const usuario = await database.usuarios.findOne({
        where: {
          id: id,
          status_id: {
            [Op.not]: status.deletado,
          },
        },
        include: [
          { model: database.status },
          { model: database.contas },
        ],
      });
      return usuario;
    } catch (error) {
      throw error;
    }
  }

  static async create(data) {
    const t = await database.sequelize.transaction();

    try {

      const conta = await database.contas.create(data.conta, { transaction: t });

      data.usuario.conta_id = conta.id;
      const usuario = await database.usuarios.create(data.usuario, { transaction: t });

      await t.commit();

      return await this.getByID(usuario.id);
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}

module.exports = UserModel;
