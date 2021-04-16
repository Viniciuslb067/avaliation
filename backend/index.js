const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

require("./controllers/authController")(app);
require("./controllers/avaliationController")(app);
require("./controllers/resultController")(app);
require("./controllers/systemController")(app);
require("./controllers/userController")(app);

app.listen(3001, () => {
  console.log("Servidor iniciado!");
});
