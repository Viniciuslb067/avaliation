const mongoose = require("../database");

const AvaliationSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    requester: {
        type: String,
        required: true,
        uppercase: true,
    },
    start_date: {
        type: String,
        required: true,
    },
    end_date: {
        type: String,
        required: true,
    },
    system: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "Ativada",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const Avaliation = mongoose.model( "Avaliation", AvaliationSchema);
module.exports = Avaliation;
