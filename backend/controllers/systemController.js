const express = require("express");
const authMiddleware = require("../middlewares/auth");

const System = require("../models/System");

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
    try {
        const avaliations = await Result.find();

        return res.json({ avaliations })


    } catch (err) {
        return res.status(400).send({ error: "Erro ao listar as avaliações" });
    }
});

router.post("/", async (req, res) => {
    try {

        const { name, system, area } = req.body;

        if(!system || !name || !area) {
            return res.status(200).json({status:2, error: "Preencha todos os campos!"})
          }

        if (await System.findOne({ system: system, name: name })) {
            return res.status(200).json({ status: 2, error: "Sistema já cadastrado!" });
        }

        const systemCreate = await System.create(req.body);

        return res.json({ systemCreate });

    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "Erro ao avaliar" });
    }
});

router.put("/:avaliationId", async (req, res) => {
    res.json({ user: req.userId });
});

router.delete("/:avaliationId", async (req, res) => {
    res.json({ user: req.userId });
});

module.exports = (app) => app.use("/system", router);
