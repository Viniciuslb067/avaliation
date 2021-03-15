const Avaliation = require('../models/Avaliation')
const User = require('../models/User')

module.exports = {

  async edit(req, res) {
    const { id } = req.params
    const user = await Avaliation.findByPk({ where: {id: id} })
    res.json(user)
  },

  async index(req, res) {
    const note = await Avaliation.findAll({ 
      
      where: { status: 1 } })
    res.json(note)

  },

  async store(req, res) {
    const { question, requester, start_date, end_date, objective, system ,status } = req.body

    if(!question || !requester || !start_date || !end_date || !objective || !system) {
      return res.status(200).json({status:2, error: "Preencha todos os campos!"})
    } else {
      await Avaliation.create({question, requester, start_date, end_date, objective, system, status: 1})

      return res.status(200).json({status:1, success: "Avaliação criada com sucesso!"})
    }

  },

  async delete(req, res) {
    const { id } = req.params
    console.log(id)
    await Avaliation.destroy({ where: {id: id}  })
    return res.status(200).json({status:1, success: "Avaliação excluida com sucesso!"})
  }

}