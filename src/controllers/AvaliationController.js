const Avaliation = require('../models/Avaliation')

module.exports = {
  async index(req, res) {
    const note = await Avaliation.findAndCountAll({ where: { avaliation: 'bom' } })
    if(note === 0) {
      console.log("Nenhuma avaliação: Bom")
    } else {
      return res.json(note) 
    }

  },

  async store(req, res) {
    const { name, email, avaliation } = req.body

    const note = await Avaliation.create({name, email, avaliation})

    return res.json(note)
  } 
}