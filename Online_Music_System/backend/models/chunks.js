const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name : {
        type: String,
        require: true
    },
    email : {
        type : String,
        require: true,
        unique: true
    },
    password : {
        type: String,
        require: true,
    },
    groups : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Groups'
    }]
})
module.exports = mongoose.model('Users',UserSchema);