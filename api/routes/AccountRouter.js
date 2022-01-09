// Libs
const { Router } = require("express");
const router = Router();

// Validate
const Validate = require("../validate/Validate");
const { validacoes: validacoesTransfer } = require("../validate/transfer");
const { validacoes: validacoesDeposito } = require("../validate/deposit");

// helpers
const help = require("../helpers/helpers");

// Config
const config = require("../config_system/configs.json");

// Models
const AccountModel = require("../controller/AccountModel");
const TransferModel = require("../controller/TransferModel");

// Routes
router.get("/transfer", async (req, res) => {
    try{
        const transferencias = await TransferModel.getAll();

        res.send(transferencias)
    }catch (error) {
        res.status(500).send({ msg: error.message });
    }
})

router.post("/transfer", async (req, res) => {
    try {
        const transfer = req.body;
        const { numeroOrigem, numeroDestino, valor } = req.body;

        const validacao = Validate.main(validacoesTransfer, transfer);
        if (validacao.erros) {
            return res.status(400).send({
                msg: "Corriga os seguintes erros",
                erros: validacao.erros,
            });
        }

        let contaOrigem = await AccountModel.getByNumber(numeroOrigem);
        if (!contaOrigem)
            return res.send({ msg: "Conta de origem não encontrada!" }).status(400);

        let contaDestino = await AccountModel.getByNumber(numeroDestino);
        if (!contaDestino)
            return res.send({ msg: "Conta de destino não encontrada!" }).status(400);

        if (contaOrigem.valor < valor)
            return res.send({ msg: "Conta de origem não tem saldo suficiente!" }).status(400);

        contaOrigem.valor = parseFloat(contaOrigem.valor) - parseFloat(valor) - config.valueTransfer;
        contaDestino.valor = parseFloat(contaDestino.valor) + parseFloat(valor);

        let contaAtualizada = await AccountModel.transfer(contaOrigem, contaDestino);
        await help.salvarTransacao("TRANSFERENCIA", contaOrigem.id, contaDestino.id, valor);

        return res.send({
            msg: 'Transferencia realizada com sucesso!',
            contaOrigem: contaAtualizada
        });
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
});

router.post("/deposit", async (req, res) => {
    try {
        const deposit = req.body;
        const { conta, valor } = req.body;

        const validacao = Validate.main(validacoesDeposito, deposit);
        if (validacao.erros) {
            return res.status(400).send({
                msg: "Corriga os seguintes erros",
                erros: validacao.erros,
            });
        }

        let contaBancaria = await AccountModel.getByNumber(conta);
        if (!contaBancaria)
            return res.send({ msg: "Conta não encontrada!" }).status(400);

        let novoValor = parseFloat(contaBancaria.valor) + parseFloat(valor);

        let contaAtualizada = await AccountModel.updateValue(contaBancaria.id, novoValor);
        await help.salvarTransacao("DEPOSITO", contaBancaria.id, 0, valor);

        return res.send(contaAtualizada);
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
});

module.exports = router;