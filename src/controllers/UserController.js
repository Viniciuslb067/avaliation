const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports = {
  async all(req, res) {
    const users = await User.findAll();

    // users.forEach((value) => {
    //   const roles = ["Estagiário", "Técnico"];

    //   console.log(roles[0]);
    //   const name = value.name;
    //   const email = value.email;
    //   const role = value.role;
    //   const access = value.access;

    //   switch (role) {
    //     case 0:
    //     roles = []
    //       break;
    //     case 1:
    //       res.json([
    //         {
    //           name: name,
    //           email: email,
    //           level: roles[0],
    //         },
    //       ]);
    //       break;
    //     case 2:
    //       res.json([
    //         {
    //           level: role,
    //         },
    //       ]);
    //       break;

    //       res.json([
    //         {
    //           name: name,
    //           email: email,
    //           level: role,
    //         },
    //       ]);
    //     default:
    //       break;
    //   }
    // });
  },

  async store(req, res) {
    const { name, email, password, password2} = req.body;
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const nameRegexp = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

    if (!name || !email || !password || !password2) {
      return res
        .status(200)
        .json({ status: 2, error: "Preencha todos os campos!" });
    }

    if (name.length <= 3) {
      return res
        .status(200)
        .json({ status: 2, error: "O nome tem que possuir +3 caracteres " });
    }

    if (password !== password2) {
      return res
        .status(200)
        .json({ status: 2, error: "As senhas não coincidem!" });
    }

    if (password.length < 4) {
      return res
        .status(200)
        .json({ status: 2, error: "A senha tem que possuir +4 caracteres" });
    }

    if (nameRegexp.test(name) === false) {
      return res.status(200).json({ status: 2, error: "Nome inválido" });
    }

    if (emailRegexp.test(email) == false) {
      return res.status(200).json({ status: 2, error: "Email inválido" });
    }

    let user = await User.findOne({ where: { email } });
    const salt = await bcrypt.genSaltSync(10);

    if (!user) {
      User.create({
        name,
        email,
        password: bcrypt.hashSync(password, salt),
        role: 0,
        access: 0,
      });
      return res
        .status(200)
        .json({ status: 1, success: "Usuário cadastrado com sucesso!" });
    } else {
      return res
        .status(200)
        .json({ status: 2, error: "Email já cadastrado!" });
    }
  },

  async login(req, res) {
    const secret = "secret";
    const { email, password } = req.body;

    if(!email || !password) {
      return res
      .status(200)
      .json({ status: 2, error: "Preencha todos os campos!" });
    } 

    User.findOne({
      where: { email },
    })
      .then((user) => {
        if (!user) {
          return res
            .status(200)
            .json({ status: 2, error: "Email não cadastrado!" });
        }

        var checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
          return res.status(200).json({ status: 2, error: "Senha inválida" });
        }

        var token = jwt.sign({ email }, secret, {
          expiresIn: "24h",
        });
        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({
          status: 1,
          auth: true,
          token: token,
          id_user: user._id,
          user_name: user.name,
          user_type: user.role,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  async loginCheck(req, res) {
    const secret = "secret";
    const token = req.query.token;
    if (!token) {
      res.json({ status: 401, msg: "Não autorizado: Token inexistente!" });
    } else {
      jwt.verify(token, secret, function (err, decoded) {
        if (err) {
          return res.status(200).json({ status: 2, error: "Não autorizado" });
        } else {
          res.json({ status: 200 });
        }
      });
    }
  },

  async logout(req, res) {
    const token = req.headers.token;
    if (token) {
      res.cookie("token", null, { httpOnly: true });
    } else {
      res.status(401).send("Erro ao sair");
    }
    return res
      .status(200)
      .json({ status: 1, success: "Sessão finalizada com sucesso!" });
  },

  async deleteUser(req, res) {
    const { id } = req.params;
    await User.destroy({ where: { id: id } });
    return res
      .status(200)
      .json({ status: 1, success: "Avaliação excluida com sucesso!" });
  },
};
