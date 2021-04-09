const express = require("express");

const app = express();
const router = express.Router

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.listen(3001, () => {
  console.log("Servidor iniciado!");
});
