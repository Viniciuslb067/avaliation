const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://lb:hS2C34FrwD6wi5Or@database.0uo3i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      dbName: "database",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Conectado ao banco de dados!");
  });

mongoose.Promise = global.Promise;

module.exports = mongoose;
