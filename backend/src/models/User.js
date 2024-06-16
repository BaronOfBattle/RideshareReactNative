const mongoose = require("mongoose");
const CompanyJob = require("./Company");
const Schema = mongoose.Schema;

let User = new Schema({
    fullName: {
        type: String
    }, 
    email: {
        type: String
    }, 
    dataNasc: {
        type: Date
    }, 
    pronoum: {
        type: String
    }, 
    password: {
        type: String
    }, 
    userCategory: {
        type: String
    }, 
    profilePictureAddres: {
        type: String
    }, 
    registrationCNH: {
        type: String
    }, 
    cpf: {
        type: String
    }, 
    CNHPictureAddress: {
        type: String
    }
}, {
    collection: "user"
});

module.exports = mongoose.model("User", User);