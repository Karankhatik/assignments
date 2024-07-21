// Middleware for handling auth
const Admin = require('../db');
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    //verify the headers
    const {username, password, role} = req.headers;

    if(username){
        const findAdmin = Admin.findOne({username});
        if(findAdmin.username === username && findAdmin.password === password && findAdmin.role === role){
        req.admin = findAdmin;
            next();
        } else {
            res.status(403).json({
                msg: "user doesnt exist"
            });            
        } 
    }
}

module.exports = adminMiddleware;