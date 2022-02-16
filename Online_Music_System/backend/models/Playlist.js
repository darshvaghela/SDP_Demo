const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({

    playlistName : {
        type: String,
        require: true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    songs : [{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'songs'
    }]
})
module.exports = mongoose.model('playlists',PlaylistSchema);