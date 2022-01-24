const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({

    songName : {
        type: String,
        require: true
    },
    movieName : {
        type: String,
        require: true
    },
    singerName : {
        type: String,
        require: true
    },
    link : {
        type: String,
        require: true
    }
})
module.exports = mongoose.model('songs',SongSchema);