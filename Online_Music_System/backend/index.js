const express = require('express')        // express return function it self
const connectToMongo = require('./db');    
const cors = require('cors');

const app = express()
const port = 4099

app.use(cors());
app.use(express.json());

app.use('/auth',require('./routes/auth'));
app.use('/song',require('./routes/song'));
app.use('/playlist',require('./routes/playlist'));


app.listen(port, () => {
    console.log(`Chat app listening at http://localhost:${port}`)
})

connectToMongo();