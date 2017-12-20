

const mongoose = require('mongoose');

let emailRegExp = /.+\@.+\..+/;
let UserSchema = new mongoose.Schema({

 firstName: {
    type: String, index: 
    true },
 lastName: {
    type:String, 
    unique:true
    },
 profession: String,
 email: {
    type:String,
    required: false,
    match: /.+\@.+\..+/ //RegExp voor email
    },
 gender: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    enum:['M','F']
    },
 createdOn: {type:Date, 'default':Date.now }
});

module.exports = UserSchema;