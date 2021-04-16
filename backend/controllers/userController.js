const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const router = express.Router();

//Listar todos os usuários
router.get('/', async (req, res) => {
  const user = await User.find();

  return res.json(user);
});
//Listar um usuário
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    return res.json(user)
  } catch (err) {
    return res.status(400).send({ error: "Erro ao listar um usuário" })
  }
});
//Editar um usuário
router.put("/:userId", async (req, res) => {
  try {
    const { name, role, access } = req.body;

    if (!name || !role || !access) {
      return res.status(200).json({ status: 2, error: "Preencha todos os campos" });
    }

    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });

    return res.status(200).json({ status: 1, success: "Usuário atualizado com sucesso", user });

  } catch (err) {
    return res.status(400).send({ error: "Erro ao atualizar um usuário" })
  }
})
//Deletar um usuário
router.delete("/:userId", async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.userId);

    return res.status(200).json({ status: 1, success: "Usuário excluido com sucesso" });

  } catch (err) {
    return res.status(400).send({ error: "Erro ao excluir um usuário" })
  }

})
module.exports = (app) => app.use("/user", router);