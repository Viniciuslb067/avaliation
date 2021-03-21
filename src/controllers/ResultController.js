const Avaliation = require('../models/Avaliation')
const System = require('../models/System')
const Result = require('../models/Result')

module.exports = {
    async index(req, res) {
        const { avaliation_id } = req.params
    
        const url = new URL(req.url, `http://${req.headers.host}`)
    
        // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress ||
        // (req.connection.socket ? req.connection.socket.remoteAddress : null);
    
        // const user = await Result.findOne({ where: {ip_user: ip} })

         const system = await System.findOne({ where: {system: url.hostname} })
    
           if(system) {
             const avaliar = await Avaliation.findAll({ where: {system: system.system} })
             res.json(avaliar)
           }
    },

    async store(req, res) {
        const { avaliation_id, system_id  } = req.params
        const { note, comments } = req.body

        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);

        if(!note) {
            return res.status(200).json({status:2, error: "Antes de Enviar avalie o sistema!"});
        }

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