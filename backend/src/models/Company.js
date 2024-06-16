const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;

let Company = new Schema({
    name: {
        type: String
    }, 
    position: {
        type: String
    }, 
    code: {
        type: String
    }, 
    address: {
        type: String
    }, 
    CEP: {
        type: String
    }, 
    number: {
        type: String
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    collection: "company"
});

module.exports = mongoose.model("Company", Company);