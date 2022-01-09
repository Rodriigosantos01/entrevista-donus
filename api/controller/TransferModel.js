const database = require("../models");
const Sequelize = require("sequelize");

class TransferModel {
  static async getAll() {
    try {
      const transacoes = await database.transacoes.findAll(
        {
          include: [
            {
              model: database.contas, as: "contaOrigem",
              include: [
                {
                  model: database.usuarios,
                  include: [
                    { model: database.status }
                  ]
                }
              ]
            },
            {
              model: database.contas, as: "contaDestino",
              include: [
                {
                  model: database.usuarios,
                  include: [
                    { model: database.status }
                  ]
                }
              ]
            },
          ],
        }
      );
      return transacoes;
    } catch (error) {
      throw error;
    }
  }

  static async create(data) {
    try {
      await database.transacoes.create(data);

      return;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TransferModel;
