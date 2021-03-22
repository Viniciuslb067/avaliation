const Avaliation = require('../models/Avaliation')
const System = require('../models/System')
const Result = require('../models/Result')

module.exports = {
    async index(req, res) {
        const { avaliation_id } = req.params
        
        const url = new URL(req.url, `http://${req.headers.host}`)
        
        console.log(url)

        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);
    
        // const user = await Result.findOne({ where: {ip_user: ip} })

        // console.log(ip)

         const system = await System.findOne({ where: {system: url.hostname} })

         console.log(system)
    
           if(system) {
             const avaliar = await Avaliation.findAll({ where: {id: system.id} })
             console.log(avaliar)
             res.json(avaliar)
           }
    },

    async submit(req, res) {
        const { avaliation_id } = req.params
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

        await Result.create({
            ip_user: ip,
            note,
            comments,
            status: "Enviado",
            avaliation_id,
        })
    },

    async skip(req, res) {
        const { avaliation_id } = req.params
  
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);

        const avaliation = await Avaliation.findByPk(avaliation_id)

        if(!avaliation) {
            return res.status(400).json({error: 'Avaliação não encontrada'})
        }
        await Result.create({
            ip_user: ip,
            note: 0,
            comments: "",
            status: "Pulou",
            avaliation_id,
        })
    },

    async count(req, res) {
        const { id } = req.params

        console.log(id)

        const amount = [
            await Result.count({distinct: 'note', where: { note: 1}}),
            await Result.count({distinct: 'note', where: { note: 2}}),
            await Result.count({distinct: 'note', where: { note: 3}}),
            await Result.count({distinct: 'note', where: { note: 4}}),
            await Result.count({distinct: 'note', where: { note: 5}}),
        ]
        res.json(amount)
    }
}