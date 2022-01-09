const TransferModel = require("../controller/TransferModel")

exports.salvarTransacao = async (tipo, conta_origem, conta_destino, valor) => {
    await TransferModel.create({ tipo, conta_origem, conta_destino, valor });
}