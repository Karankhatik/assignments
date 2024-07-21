
const { User } = require("../db");

// Middleware for handling auth
const verifyToken = require("../helper/utils").verifyToken;
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization; // bearer token
    const words = token.split(" "); // ["Bearer", "token"]
    const jwtToken = words[1]; // token
    try {
        const decodedValue = verifyToken(jwtToken)
        const findUser = User.findOne({ username: decodedValue.username });    
        if (findUser) {
            next();
        } else {
            res.status(403).json({
                msg: "You are not authenticated"
            })
        }
    } catch (e) {
        res.json({
            msg: "Incorrect inputs"
        })
    }
}

module.exports = userMiddleware;