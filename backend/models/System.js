const mongoose = require("../database");

const SystemSchema = new mongoose.Schema({
    dns: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        uppercase: true,
        required: true,
    },
    area: {
        type: String,
        uppercase: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const System = mongoose.model("System", SystemSchema);
module.exports = System;
