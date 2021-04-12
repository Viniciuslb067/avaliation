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

        if (!user) {

            console.log(avaliation)
            if (avaliation) {
            }
        }

        const avaliation = await Avaliation.findOne({ system: url })

        const avaliations = await Result.find();

        return res.json(avaliation)


    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "Erro ao listar as avaliações" });
    }
});

router.get("/result/:avaliationId", async (req, res) => {

    try {
        const find = await Avaliation.findOne({ _id: req.params.avaliationId }).exec();

        if (find) {
            const findResult = Result.findOne({ avaliation: req.params.avaliationId }).exec();
            if (findResult) {
                const notes = [
                    await Result.countDocuments({ 'note': 1, 'avaliation': req.params.avaliationId }),
                    await Result.countDocuments({ 'note': 2, 'avaliation': req.params.avaliationId }),
                    await Result.countDocuments({ 'note': 3, 'avaliation': req.params.avaliationId }),
                    await Result.countDocuments({ 'note': 4, 'avaliation': req.params.avaliationId }),
                    await Result.countDocuments({ 'note': 5, 'avaliation': req.params.avaliationId }),
                ]
                const status = [
                    await Result.countDocuments({ 'status': "Enviado", 'avaliation': req.params.avaliationId }),
                    await Result.countDocuments({ 'status': "Ignorou", 'avaliation': req.params.avaliationId }),
                ]

                const data = await Avaliation.findOne({ _id: req.params.avaliationId }).exec();

                const comments = await Result.find({ _id: req.params.avaliationId}).exec();

                res.json({ notes, status, data, comments })
            }
        }
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "Erro ao listar os resultados" });
    }


})

router.post("/:avaliationId", async (req, res) => {
    try {
        const { avaliationId } = req.params

        console.log(avaliationId)

        const { note, comments } = req.body

        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress ||
            (req.connection.socket ? req.connection.socket.remoteAddress : null);

        if (!note) {
            return res.status(200).json({ status: 2, error: "Antes de Enviar avalie o sistema!" });
        } else {
            await Result.create({
                ip_user: ip,
                note,
                comments,
                status: "Enviado",
                avaliation: avaliationId,
            });

            return res.status(200).json({ status: 1, success: "Muito obrigado por responder a avaliação!" });
        }

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
