const System = require('../models/System')
const { index } = require('./ResultController')

module.exports = {
    async create(req, res) {
        const { system, name, area } = req.body
        
        if(!system || !name || !area) {
            return res.status(200).json({status:2, error: "Preencha todos os campos!"})
          }
        
          let systemCheck = await System.findOne({where: {name} })

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

        const systemName = await System.findAll()
        console.log(systemName)
        res.json(systemName)

    }

}