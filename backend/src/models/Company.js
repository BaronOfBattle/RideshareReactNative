const mongoose = require("mongoose");
const User = require("./User");
const Address = require("./Address");
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
    addressId: {
        type: mongoose.Schema.ObjectId, 
        ref: 'Address'
    }, 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    collection: "company"
});

module.exports = mongoose.model("Company", Company);