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
        const { avaliation_id } = req.params
        const { ip_user, note, comments } = req.body

        const avaliation = await Avaliation.findByPk(avaliation_id)

        if(!avaliation) {
            return res.status(400).json({error: 'Avaliação não encontrada'})
        }


        const result = await Result.create({
            ip_user,
            note,
            comments,
            avaliation_id
        })

        return res.json(result) 

        if(!user) {
   
        } else {
            return res.status(400).json({error: 'Avaliação já cadastrada'})
        }



    }
}