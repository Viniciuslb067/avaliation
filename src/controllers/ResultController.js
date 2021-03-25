const Avaliation = require('../models/Avaliation')
const System = require('../models/System')
const Result = require('../models/Result')

module.exports = {
    async index(req, res) {
        const { avaliation_id } = req.params
        
        const url = new URL(req.url, `http://${req.headers.host}`)

        console.log(req.headers.origin)
        
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);
    
        const user = await Result.findOne({ attributes: ['ip_user'], where: {ip_user: ip} })

        if(!user) {
            const system = await System.findOne({ where: {system: url.hostname} })
    
            if(system) {
              const avaliar = await Avaliation.findAll({ where: {id: system.id} })
              res.json(avaliar)
            }
        } else {
            return res.status(200).json({error: 'Já avaliado'})
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
        const { avaliation_id } = req.params
        
        const a = await Avaliation.findOne({ where: {id: avaliation_id} })

        if(a) {
            const b = await Result.findOne({ attributes: ['avaliation_id'], where: {avaliation_id: avaliation_id} })
            if(b) {
                const amount = [
                    await Result.count({ attributes: ['note', 'avaliation_id'], where: { avaliation_id: avaliation_id, note: 1 } }),
                    await Result.count({ attributes: ['note', 'avaliation_id'], where: { avaliation_id: avaliation_id, note: 2 } }),
                    await Result.count({ attributes: ['note', 'avaliation_id'], where: { avaliation_id: avaliation_id, note: 3 } }),
                    await Result.count({ attributes: ['note', 'avaliation_id'], where: { avaliation_id: avaliation_id, note: 4 } }),
                    await Result.count({ attributes: ['note', 'avaliation_id'], where: { avaliation_id: avaliation_id, note: 5 } }),
                ]
                res.json(amount)

            } else {
                return res.status(200).json({error: 'Zero dados para a pesquisa'})
            }
        } else {
            return res.status(200).json({error: 'Avaliação não encontrada'})
        }
    },

    async countStatus(req, res) {
        const { avaliation_id } = req.params

        const a = await Avaliation.findOne({ where: {id: avaliation_id} })

        if(a) {
            const b = await Result.findOne({ attributes: ['avaliation_id'], where: {avaliation_id: avaliation_id} })
            if(b) {
                const asd = [
                    await Result.count({ attributes: ['status', 'avaliation_id'], where: { avaliation_id: avaliation_id, status: "Enviado" } }),
                    await Result.count({ attributes: ['status', 'avaliation_id'], where: { avaliation_id: avaliation_id,status: "Pulou" } }),
                ]
                res.json(asd)
            } else {
                return res.status(200).json({error: 'Zero dados para a pesquisa'})
            }
        } else {
            return res.status(200).json({error: 'Avaliação não encontrada'})
        }
    },

    async data(req, res) {
        const { avaliation_id } = req.params

        const dados = await Avaliation.findOne({ attributes: ['id', 'question', 'requester', 'system'], where: { id: avaliation_id }})
        res.json(dados)
    },

    async comments(req, res) {
        const { avaliation_id } = req.params

        const comentarios = await Result.findAll({ attributes: ['comments'], where: { avaliation_id: avaliation_id } })
        
        res.json(comentarios)
        
    }

}