const jwt = require("jsonwebtoken");


const jwtSecret = ";lvnsdflngbl;sdfnghlsdnflhndofhndlfnhlsdnh";


const generateToken = (payload) => {
    return jwt.sign(payload, jwtSecret);
}

const verifyToken = (token) => {
    return jwt.verify(token, jwtSecret);
}

const decodeToken = (token) => {
    return jwt.decode(token);
}   

module.exports = {generateToken, verifyToken, jwtSecret, decodeToken}