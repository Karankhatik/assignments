const User = require('../db');

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    //verify the headers
    const {username, password, role} = req.headers;

    if(username){
        const findUser = User.findOne({username});
        if(findUser.username === username && findUser.password === password && findUser.role === role){
            req.user = findUser;
            next();
        } else {
            res.status(403).json({
                msg: "user doesnt exist"
            });            
        } 
    }
}

module.exports = userMiddleware;