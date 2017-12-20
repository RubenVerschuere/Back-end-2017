const mongoose = require("mongoose");
let UserSchema = require("../schemas/users");

let User = mongoose.model('User', UserSchema,"Users"); //model,schema,collection Users is de naam van de collection

module.exports = User;
