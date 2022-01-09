const database = require("../models");
const Sequelize = require("sequelize");

class AccountModel {
  static async getAll() {
    try {
      const contas = await database.contas.findAll({
        include: [
          { model: database.usuarios },
        ],
      });
      return contas;
    } catch (error) {
      throw error;
    }
  }

  static async getByNumber(numero) {
    try {
      const conta = await database.contas.findOne({
        where: {
          numero
        }
      });
      return conta;
    } catch (error) {
      throw error;
    }
  }

  static async getByID(id) {
    try {
      const conta = await database.contas.findOne({
        where: {
          id: id
        }
      });
      return conta;
    } catch (error) {
      throw error;
    }
  }

  static async updateValue(id, valor) {
    try {
      await database.contas.update(
        {
          valor
        },
        {
          where: { id },
        }
      );
      return await this.getByID(id);
    } catch (error) {
      throw error;
    }
  }

  static async transfer(contaOrigem, contaDestino) {
    const t = await database.sequelize.transaction();

    try {

      await database.contas.update({
        valor: contaOrigem.valor
      },
        {
          where: { id: contaOrigem.id },
        }
      );

      await database.contas.update({
        valor: contaDestino.valor
      },
        {
          where: { id: contaDestino.id },
        }
      );

      await t.commit();

      return await this.getByID(contaOrigem.id);
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}

module.exports = AccountModel;
