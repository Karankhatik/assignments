const { Admin } = require("../db");

// Middleware for handling auth
const verifyToken = require("../helper/utils").verifyToken;
function adminMiddleware(req, res, next) {
    // Implement admin auth logic

    const token = req.headers.authorization; // bearer token
    const words = token.split(" "); // ["Bearer", "token"]
    const jwtToken = words[1]; // token
    try {
        const decodedValue = verifyToken(jwtToken)
        const findAdmin = Admin.findOne({ username: decodedValue.username });    
        if (findAdmin) {
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

module.exports = adminMiddleware;