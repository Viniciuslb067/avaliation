const Avaliation = require('../models/Avaliation')
const { Op } = require("sequelize");

module.exports = {

  async edit(req, res) {
    const { id  } = req.params
    const avaliation = await Avaliation.findOne({ where: {id: id} })
    res.json(avaliation)
  },

  async update(req, res) {
      const {id, question, requester, start_date, end_date, status} = req.body

      Avaliation.update(
        {
          question: question,
          requester: requester,
          start_date: start_date,
          end_date: end_date,
          status: status
        },
        {
          where: {id: id}
        }
        )
        return res.status(200).json({status:1, success: "Avaliação atualizada com sucesso!"})

  },

  async avaliacaoAtiva(req, res) {
    var data = new Date();
 
    const formatter = Intl.DateTimeFormat("pt-br", {
      dateStyle: "short"
    })

    formatter.format(data)

    console.log(formatter.format(data))

    const asdasd = await Avaliation.findAll({ attributes: ['end_date'] })
    console.log(asdasd)

    // attributes: ['end_date', formatter.format(end_date)],

    const Assessment = await Avaliation.findAll({ 
      where: {
        status: "Ativa",
        end_date: {
          [Op.lt]: new Date(),
        }
      }
    })

    res.json(Assessment)

  },

  async avaliacaoInativa(req, res) {
    const inactiveAssessments = await Avaliation.findAll({ where: { status: "Inativa" } })
    res.json(inactiveAssessments)
  },

  async store(req, res) {
    const { question, requester, start_date, end_date, system} = req.body

    if(!question || !requester || !start_date || !end_date) {
      return res.status(200).json({status:2, error: "Preencha todos os campos!"})
    }

    let avaliation = await Avaliation.findOne({ where: {question, system} })

    if(!avaliation) {
      Avaliation.create({question, requester, start_date, end_date, system ,status: "Ativa"})

      return res.status(200).json({status:1, success: "Avaliação criada com sucesso!"})
    } else {
      return res.status(200).json({status:2, error: "Já existe uma avaliação com essa pergunta para o sistema: " + system});
    }
  },

  async delete(req, res) {
    const { id } = req.params
    await Avaliation.destroy({ where: {id: id}  })
    return res.status(200).json({status:1, success: "Avaliação excluida com sucesso!"})
  }

}