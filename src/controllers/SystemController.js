const System = require('../models/System')
const Avaliation = require('../models/Avaliation') 

module.exports = {
    async create(req, res) {
        const { system, name, area } = req.body
        
        if(!system || !name || !area) {
            return res.status(200).json({status:2, error: "Preencha todos os campos!"})
          }
          
          const systemCheck = await System.findOne({ attributes: ['name', 'system'], where: {system, name} })
          console.log(systemCheck)

          if(!systemCheck) {
            System.create({
                  system,
                  name,
                  area
              })
              return res.status(200).json({status:1, success: "Sistema cadastrado com sucesso!"})

          } else {
              return res.status(200).json({status:2, error: "Sistema já cadastrado!"});
          }
    },
    
    async index(req, res) {

        const avaliationSystemName = await Avaliation.findAll({attributes: ['system']})

        console.log(avaliationSystemName.attributes)

        const systemName = await System.findAll()
        res.json(systemName)

    }

}