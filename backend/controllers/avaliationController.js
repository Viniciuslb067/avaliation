const express = require("express");
const authMiddleware = require("../middlewares/auth");

const Avaliation = require("../models/Avaliation");
const Result = require("../models/Result");
const System = require("../models/System");

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
    try {
        const avaliations = await Avaliation.find();

        return res.json({ avaliations })


    } catch (err) {
        return res.status(400).send({ error: "Erro ao listar as avaliações" });
    }
});

router.post("/", async (req, res) => {
    try {

        const project = await Avaliation.create({...req.body});

        return res.json({ project });
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "Erro ao criar uma avaliação" });
    }
});

router.put("/:avaliationId", async (req, res) => {
    res.json({ user: req.userId });
});

router.delete("/:avaliationId", async (req, res) => {
    res.json({ user: req.userId });
});

module.exports = (app) => app.use("/avaliation", router);
