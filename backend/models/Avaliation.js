const mongoose = require("../database");
const DateOnly = require("mongoose-dateonly")(mongoose)

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
        type: DateOnly,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    system: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const Avaliation = mongoose.model( "Avaliation", AvaliationSchema);
module.exports = Avaliation;
