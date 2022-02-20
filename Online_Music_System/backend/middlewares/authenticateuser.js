const jwt = require('jwt-then');
const JWT_SECRET = 'Welcome to spotify';

const authenticateUser = async (req, res, next) => {
    const token = req.header('token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = await jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }

}
module.exports = authenticateUser;