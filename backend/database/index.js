const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://lb:hS2C34FrwD6wi5Or@database.0uo3i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/database", 
  {
      useMongoClient: true
  }
);
mongoose.Promise = global.Promise;

module.exports = mongoose;
