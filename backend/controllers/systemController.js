const express = require("express");
const authMiddleware = require("../middlewares/auth");

const System = require("../models/System");

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
    try {
        const systems = await System.find();

        return res.json({ systems })
    } catch (err) {
        return res.status(400).send({ error: "Erro ao listar os sistemas" });
    }
});

router.post("/", async (req, res) => {
    try {

        const { name, system, area } = req.body;

        if (!system || !name || !area) {
            return res.status(200).json({ status: 2, error: "Preencha todos os campos!" })
        }

        if (await System.findOne({ system: system, name: name })) {
            return res.status(200).json({ status: 2, error: "Sistema já cadastrado!" });
        }

        const systemCreate = await System.create(req.body);

        return res.json({ systemCreate });

    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "Erro ao cadastrar sistema" });
    }
});

module.exports = (app) => app.use("/system", router);
