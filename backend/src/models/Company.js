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


Company.statics.findByUserId = function (userId) {
    return this.findOne({ userId: userId }).populate('userId');
};

const CompanyModel = mongoose.model("Company", Company);

module.exports = CompanyModel;