const express = require("express");
const authMiddleware = require("../middlewares/auth");

const Avaliation = require("../models/Avaliation");
const Result = require("../models/Result");
const System = require("../models/System");

const router = express.Router();

router.use(authMiddleware);

//Listar todas as avaliações
router.get("/", async (req, res) => {
    try {
        const avaliation = await Avaliation.find().where('status').all(['true'])

        return res.json({ avaliation })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "Erro ao listar as avaliações" });
    }
});
//Listar uma avaliação
router.get("/:avaliationId", async (req, res) => {
    try {
        const avaliation = await Avaliation.findById(req.params.avaliationId);

        return res.json({ avaliation })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "Erro ao listar a avaliação" });
    }
});
//Criar uma avaliação
router.post("/", async (req, res) => {
    try {
        const avaliation = await Avaliation.create({ ...req.body });

        return res.json({ avaliation });
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "Erro ao criar uma avaliação" });
    }
});
//Editar uma avaliação
router.put("/:avaliationId", async (req, res) => {
    try {
        const { question, requester, start_date, end_date } = req.body;

        if (!question || !requester || !start_date || !end_date ) {
            return res.status(200).json({ status: 2, error: "Preencha todos os campos!" });
        }

        const avaliation = await Avaliation.findByIdAndUpdate(req.params.avaliationId, req.body, { new: true })

        return res.status(200).json({ status: 1, success: "Avaliação atualizada com sucesso!", avaliation });

    } catch (err) {
        return res.status(400).send({ error: "Erro ao atualizar uma avaliação" });
    }
});
//Deletar uma avaliação
router.delete("/:avaliationId", async (req, res) => {
    try {
        await Avaliation.findByIdAndRemove(req.params.avaliationId);

        return res.json();
    } catch (err) {
        return res.status(400).send({ error: "Erro ao deletar uma avaliação" });
    }
});

module.exports = (app) => app.use("/avaliation", router);
