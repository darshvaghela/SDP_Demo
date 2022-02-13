const mongoose = require('mongoose');

const SongDetailsSchema = new mongoose.Schema({

    songName : {
        type: String,
        require: true
    },
    imageLink : {
        type: String,
        require: true
    }
})
module.exports = mongoose.model('songDetails',SongDetailsSchema);