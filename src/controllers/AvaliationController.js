const Avaliation = require('../models/Avaliation')
const User = require('../models/User')

module.exports = {

  async edit(req, res) {
    const { id  } = req.params
    const avaliation = await Avaliation.findOne({ where: {id: id} })
    res.json(avaliation)
  },

  async update(req, res) {
      const {id, question, requester, objective, start_date, end_date, system, status} = req.body

     if(status === "Ativar") {
       status == 1
     } else {
       status == 0
     }

      Avaliation.update(
        {
          question: question,
          requester: requester,
          objective: objective,
          start_date: start_date,
          end_date: end_date,
          system: system,
          status: status
        },
        {
          where: {id: id}
        }
        )
        return res.status(200).json({status:1, success: "Avaliação atualizada com sucesso!"})

  },

  async index(req, res) {
    const note = await Avaliation.findAll({ where: { status: 1 } })
    res.json(note)
  },

  async store(req, res) {
    const { question, requester, start_date, end_date, objective, system ,status } = req.body

    if(!question || !requester || !start_date || !end_date || !objective || !system) {
      return res.status(200).json({status:2, error: "Preencha todos os campos!"})
    } else {
      await Avaliation.create({question, requester, start_date, end_date, objective, system, status})

      return res.status(200).json({status:1, success: "Avaliação criada com sucesso!"})
    }

  },

  async delete(req, res) {
    const { id } = req.params
    await Avaliation.destroy({ where: {id: id}  })
    return res.status(200).json({status:1, success: "Avaliação excluida com sucesso!"})
  }

}