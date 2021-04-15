const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://localhost/",
    {
      dbName: "database",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Conectado ao banco de dados!");
  });

mongoose.Promise = global.Promise;

module.exports = mongoose;
