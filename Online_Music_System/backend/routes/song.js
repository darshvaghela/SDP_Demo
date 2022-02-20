const express = require('express')
const authenticateuser = require('../middlewares/authenticateuser')
const Song = require('../models/Song')
const Playlist =require('../models/Playlist')
const router = express.Router()


router.post('/addsong', async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ success: false, error: errors.array() });
    // }
    

    try {
        let song = await Song.findOne({ songName: req.body.songName });
        if (song) {
            return res.status(400).json({ error: "Song already exists", success: false })
        }
        song = await Song.create({ songName: req.body.songName, movieName: req.body.movieName, singerName: req.body.singerName, songLink: req.body.songLink, imageLink: req.body.imageLink, genre: req.body.genre });
        res.send({ success: true })
    }
    catch (error) {
        res.status(500).send("Internal Serval Error");
    }
})
router.get('/fetchallsongs/:genre', async (req, res) => {
    const genre= req.params.genre;
    try {
        let songs = null;
        if(genre !== "all")
            songs = await Song.find({genre: genre})
        else
            songs = await Song.find();

        res.json({ success: true, songs });
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
    }

})
router.delete('/deletesong', async (req, res) => {

    Song.deleteOne({ _id: req.body.id }).then((result) => {
        res.status(200).json(result)
    }).catch((err) => { console.warn(err) })
    console.log("item deleted")
})

router.get(`/fetchbyid/:id`, async (req, res) => {
    let id = req.params.id;
    try {
        let song = await Song.findById(id);
        res.json({ success: true, song });
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
    }

})
router.post('/editsong', async (req, res) => {

    await Song.updateOne({ _id: req.body.id }, { songName: req.body.songName, movieName: req.body.movieName, singerName: req.body.singerName, genre: req.body.genre });
    res.send({ success: true });

})
router.post('/createplaylist',authenticateuser,async (req, res) => {
    try {
        let playlist = await Playlist.create({ playlistName:req.body.playlistName,user:req.user.id,songs:req.body.selectedSongs });
        res.send({ success: true })
    }
    catch (error) {
        res.status(500).send("Internal Serval Error");
    }

})

module.exports = router;