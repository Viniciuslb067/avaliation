const Avaliation = require('../models/Avaliation')

module.exports = {
  async index(req, res) {
    const note = await Avaliation.findAndCountAll({ where: { status: 1 } })
    if(note === 0) {
      console.log("Nenhuma avaliação: Bom")
    } else {
      return res.json(note) 
    }

  },

  async store(req, res) {
    const { question, requester, start_date, end_date, objective, status } = req.body

    console.log(req.body)

    const note = await Avaliation.create({question, requester, start_date, end_date, objective, status})

    return res.json(note)
  } 
}