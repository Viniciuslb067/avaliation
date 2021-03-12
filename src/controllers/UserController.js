const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

module.exports = {
    async store(req, res) {
        const { name, email, password, password2 } = req.body

        if(!name || !email || !password || !password2) {
            return res.status(200).json({status:2, error: "Preencha todos os campos!"})
          }
        
          if(name.length <= 3) {
            return res.status(200).json({status:2, error: "O nome tem que possuir +3 caracteres "})
          }

          if(password !== password2) {
            return res.status(200).json({status:2, error: "As senhas não coincidem!"});
          }
        
          if(password.length < 4){
            return res.status(200).json({status:2, error: "A senha tem que possuir +4 caracteres"});
          }

          let user = await User.findOne({email})
          const salt = await bcrypt.genSaltSync(10)

          if(!user) {
              User.create({
                  name,
                  email,
                  password: bcrypt.hashSync(password, salt),
                  level: 0,
                  acess: 0
              })

              return res.status(200).json({status:1, success: "Usuário cadastrado com sucesso!"})

          } else {
              return res.status(200).json({status:2, error: "Usuario já cadastrado!"});
          }
    },

    async login(req, res) {
        const secret = 'secret'
        const { email, password, acess } = req.body

        console.log(req.body)

        // isCorrectPassword = (password, callback) => {
        //     bcrypt.compare(password, this.password, function(err, same) {
        //         if(err) {
        //             callback(err)
        //         } else {
        //             callback(err, same)
        //         }
        //     })
        // }

        //  User.findOne({ where: {email} }, function(err, user) {
        //      console.log(user)
        //  })



        // let user = await User.findOne({email})
        // console.log(user)

        // if(!user) {
        //     if(!email || !password) {
        //         return res.status(200).json({status:2, error: "Preencha todos os campos!"})
        //     } else {
        //         return res.status(200).json({status:2, error: "Email não cadastrado!"})
        //     }
        // }

        // user.isCorrectPassword(password, async function (err, same) {
        //     if(!same) {
        //         return res.status(200).json({status:2, error: "Senha incorreta!"})
        //     } else {
        //         const payload = {email}
        //         const token = jwt.sign(payload, secret, {
        //           expiresIn: '24h'
        //         })
        //         res.cookie('token', token, {httpOnly: true})
        //         res.status(200).json({status:1, auth:true, token: token, id_user: user._id, user_name: user.name, user_type: user.level})
        //     }
        // })

        User.findOne({ where: {email} }, function(err, user) {
             if(err) {
                 console.log(err)
             } else if (!user) {
                 if(!email || password) {
                     return res.status(200).json({status:2, error: "Preencha todos os campos!"})
                 } else 
                     return res.status(200).json({status:2, error: "Email não cadastrado!"})
                 } else {
                    
                    var passwordIsValid = bcrypt.compareSync(
                        req.body.password,
                        user.password
                      );

                      if (!passwordIsValid) {
                        return res.status(401).send({
                          accessToken: null,
                          message: "Invalid Password!"
                        });
                      }

                         const payload = {email}
                         const token = jwt.sign(payload, secret, {
                           expiresIn: '24h'
                         })
                         res.cookie('token', token, {httpOnly: true})
                         res.status(200).json({status:1, auth:true, token: token, id_user: user._id, user_name: user.name, user_type: user.level})
                       
             }
         })
    }
}