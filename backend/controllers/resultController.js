const express = require("express");
const authMiddleware = require("../middlewares/auth");

const Avaliation = require("../models/Avaliation");
const Result = require("../models/Result");
const System = require("../models/System");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const url = req.headers.origin || req.headers.host
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);

        const user = await Result.findOne({ ip_user: ip })

        console.log(url)

        if(!user) {
            
            console.log(avaliation)
            if(avaliation) {
            }
        }

        const avaliation = await Avaliation.findOne({ system: url })

        const avaliations = await Result.find();

        return res.json( avaliation )


    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "Erro ao listar as avaliações" });
    }
});

router.post("/:avaliationId", async (req, res) => {
    try {
        const { avaliationId } = req.params
        const { note, comments } = req.body

        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress ||
            (req.connection.socket ? req.connection.socket.remoteAddress : null);

        const result = await Result.create({
            ip_user: ip,
            note,
            comments,
            status: "Enviado",
            avaliation: avaliationId,
        });

        return res.json({ result });
    } catch (err) {
        return res.status(400).send({ error: "Erro ao avaliar" });
    }
});

router.put("/:avaliationId", async (req, res) => {
    res.json({ user: req.userId });
});

router.delete("/:avaliationId", async (req, res) => {
    res.json({ user: req.userId });
});

module.exports = (app) => app.use("/avaliate", router);
