const Avaliation = require('../models/Avaliation')
const Result = require('../models/Result')

module.exports = {
    async index(req, res) {
        const { avaliation_id } = req.params

        const avaliation = await Avaliation.findByPk(avaliation_id, {
            include: { association: 'results' }
        })

        console.log(avaliation)

        return res.json(avaliation)
    },

    async store(req, res) {
        const { avaliation_id, system_id  } = req.params
        const { note, comments } = req.body

        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);

        const avaliation = await Avaliation.findByPk(avaliation_id)

        if(!avaliation) {
            return res.status(400).json({error: 'Avaliação não encontrada'})
        }

        const result = await Result.create({
            ip_user: ip,
            note,
            comments,
            status: "Enviado",
            avaliation_id,
            system_id

        })

        return res.json(result) 

    }
}