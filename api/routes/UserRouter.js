// Libs
const { Router } = require("express");
const router = Router();

// Models
const UserModel = require("../controller/UserModel")
const AccountModel = require("../controller/AccountModel")

// Validate
const Validate = require("../validate/Validate");
const { validacoes } = require("../validate/user");

// Routes
router.get("/", async (req, res) => {
    const usuarios = await UserModel.getAll();

    res.send(usuarios)
});

router.get("/:cpf", async (req, res) => {
    const { cpf } = req.params;
    const usuario = await UserModel.getByCPF(cpf);

    if (!usuario)
        return res.send({ msg: "Conta não encontrada" }).status(404);

    res.send(usuario)
});

router.post("/", async (req, res) => {
    try {
        let user = req.body;
        const { nome, cpf } = req.body;

        const validacao = Validate.main(validacoes, user);
        if (validacao.erros) {
            return res.status(400).send({
                msg: "Corriga os seguintes erros",
                erros: validacao.erros,
            });
        }

        const conta = await UserModel.getByCPF(cpf);
        if (conta)
            return res.send({ msg: "Já existe uma conta com esse CPF." }).status(400);

        let numero = await gerarNumeroConta();

        let data = {
            usuario: {
                nome, cpf
            },
            conta: {
                numero
            }
        }

        const contaCriada = await UserModel.create(data);

        return res.send(contaCriada).status(201);
    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
});

const gerarNumeroConta = async () => {
    let numeros = []
    let stop = true;

    do {
        while (numeros.length < 5) {
            numeros.push(Math.floor(Math.random() * 10));
        }
        let numero = numeros.join('');

        let conta = await AccountModel.getByNumber(numero);
        if (!conta) {
            stop = false;
            return numero;
        }

    } while (stop)

}

module.exports = router;