const express = require('express')
const authenticateuser = require('../middlewares/authenticateuser')
const Song = require('../models/Song')
const AdminPlaylist = require('../models/AdminPlaylist')
const UserPlaylist = require('../models/UserPlaylist')

const router = express.Router()

router.post('/createplaylistbyadmin', authenticateuser, async (req, res) => {
    try {
        let playlist = await AdminPlaylist.create({ playlistName: req.body.playlistName, user: req.user.id, songs: req.body.selectedSongs });
        res.send({ success: true })
    }
    catch (error) {
        res.status(500).send("Internal Serval Error");
    }

})

router.post('/createplaylistbyuser', authenticateuser, async (req, res) => {
    try {
        let playlist = await UserPlaylist.create({ playlistName: req.body.playlistName, user: req.user.id, songs: [req.body.songId] });
        res.send({ success: true })
    }
    catch (error) {
        res.status(500).send("Internal Serval Error");
    }

})

router.get('/fetchadminplaylists/:id',async (req, res) => {
    let id = req.params.id

    try {
        let playlists;
        if (id!=="all") {
            playlists = await AdminPlaylist.find({ _id: id }).populate('songs');
        }
        else {
            playlists = await AdminPlaylist.find().populate('songs');
        }
        res.send({ success: true, playlists })
    }
    catch (error) {
        res.status(500).send("Internal Serval Error");
    }
})
router.post('/editplaylist', authenticateuser, async (req, res) => {
    try {
        await AdminPlaylist.updateOne({ _id: req.body.playlistId }, { playlistName: req.body.playlistName, songs: req.body.selectedSongs });
        res.send({ success: true })
    }
    catch (error) {
        res.status(500).send("Internal Serval Error");
    }

})
router.delete('/deleteplaylist', async (req, res) => {

    AdminPlaylist.deleteOne({ _id: req.body.id }).then((result) => {
        res.status(200).json(result)
    }).catch((err) => { console.warn(err) })
})
module.exports = router;