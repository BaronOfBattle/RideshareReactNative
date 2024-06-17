const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Address = new Schema({
    street: {
        type: String
    }, 
    city: {
        type: String
    }, 
    state: {
        type: String
    }, 
    country: {
        type: String
    }, 
    cep: {
        type: String
    }, 
}, {
    collection: "address"
});

module.exports = mongoose.model("Address", Address);