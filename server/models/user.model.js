const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {type: String},
    age: {type: Number},
    address_1: {type: String},
    address_2: {type: String},
    address_3: {type: String},
    address_4: {type: String},
    address_5: {type: String},
    address_6: {type: String},
    address_7: {type: String},
    address_8: {type: String},
    address_9: {type: String}
});


const userModel = mongoose.model('user', userSchema);

module.exports = { userModel }