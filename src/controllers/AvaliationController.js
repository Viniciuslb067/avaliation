const Avaliation = require('../models/Avaliation')

module.exports = {

  async edit(req, res) {
    const { uuid } = req.params

    try {
      const avaliation = await Avaliation.findOne({ where: { uuid: uuid } })
      console.log(avaliation)
      return res.json(avaliation)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }

  },

  async update(req, res) {
    const { uuid, question, requester, start_date, end_date, status } = req.body

    try {
      Avaliation.update(
        {
          question: question,
          requester: requester,
          start_date: start_date,
          end_date: end_date,
          status: status
        },
        {
          where: { uuid: uuid }
        }
      )
      return res.status(200).json({ status: 1, success: "Avaliação atualizada com sucesso!" })
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }

  },

  async avaliacaoAtiva(req, res) {
    var data = new Date();

    try {
      const End_date = await Avaliation.findAll({ attributes: ['end_date', 'id'] })

      End_date.forEach(a => {
        if (data.toISOString().split("T")[0] === a.end_date) {
          Avaliation.update({ status: "Inativa" }, { where: { id: a.id } })
        } else {
          Avaliation.update({ status: "Ativa" }, { where: { id: a.id } })
        }
      });

      const Assessment = await Avaliation.findAll({
        where: {
          status: "Ativa",
        }
      })

      Assessment.forEach(valor => {
        const uuid = valor.uuid
        const question = valor.question
        const requester = valor.requester
        const system = valor.system
        const start_date = valor.start_date.split('-').reverse().join('/')
        const end_date = valor.end_date.split('-').reverse().join('/')
        const status = valor.status

        return res.json([{
          uuid: uuid, 
          question: question, 
          requester: requester,
          system: system,
          start_date: start_date,
          end_date: end_date,
          status: status,
        }])
      })

    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }

  },

  async avaliacaoInativa(req, res) {

    try {
      const inactiveAssessments = await Avaliation.findAll({ where: { status: "Inativa" } })

      inactiveAssessments.forEach(valor => {
        const uuid = valor.uuid
        const question = valor.question
        const requester = valor.requester
        const system = valor.system
        const start_date = valor.start_date.split('-').reverse().join('/')
        const end_date = valor.end_date.split('-').reverse().join('/')
        const status = valor.status

        return res.json([{
          uuid: uuid, 
          question: question, 
          requester: requester,
          system: system,
          start_date: start_date,
          end_date: end_date,
          status: status,
        }])
      })

    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }

  },

  async criarAvaliacao(req, res) {
    const { question, requester, start_date, end_date, system } = req.body

    try {
      if (!question || !requester || !start_date || !end_date || !system) {
        return res.status(200).json({ status: 2, error: "Preencha todos os campos!" })
      }
  
      let avaliation = await Avaliation.findOne({ where: { question, system } })
  
      if (!avaliation) {
        Avaliation.create({ question, requester, start_date, end_date, system, status: "Ativa" })
  
        return res.status(200).json({ status: 1, success: "Avaliação criada com sucesso!" })
      } else {
        return res.status(200).json({ status: 2, error: "Já existe uma avaliação com essa pergunta para o sistema: " + system });
      }
    } catch(err) {
      console.log(err)
      return res.status(500).json(err)
    }

  },

  async delete(req, res) {
    const { uuid } = req.params

    try {
      await Avaliation.destroy({ where: { uuid: uuid } })
      return res.status(200).json({ status: 1, success: "Avaliação excluida com sucesso!" })
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }

  }

}