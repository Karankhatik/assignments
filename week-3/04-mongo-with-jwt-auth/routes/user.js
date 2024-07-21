const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require('../db');
const {generateToken} = require('../helper/utils');
// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const {username, password, role} = req.body;

    // check if a user with this username already exists
    if(username && password && role) {
        const findAdmin = await User.findOne({username});
        if(findAdmin) {
            res.status(400).json({
                message: 'User already exists'
            })
        }else {
            const newAdmin = await User.create({
                username: username,
                password: password,
                role: role
            })
            res.status(200).json({
                message: 'User created successfully'
            })
        }
    }
});

router.post('/signin', (req, res) => {

    const {username, password} = req.body;    
    
    if(username && password) {
        const findUser = User.findOne({username});

        if(findUser.username === username && findUser.password === password) {
            const payload = {
                username: findUser.username,
                role: findUser.role
            }

            const token = generateToken(payload);
            res.status(200).json({message: 'User logged in successfully', token:token });
        }
    }


});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic

    const response = Course.find({});

    if(!response) {
        res.status(404).json({ message: 'No courses found' });
    }

    res.status(200).json({ courses: response });

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic

    const courseId = req.params.courseId;
    //purchase logic

    const findUser = await User.findOne({username: req.user.username});

    if(findUser.purchasedCourses.includes(courseId)) {
        res.status(400).json({ message: 'Course already purchased' });
    }

    findUser.purchasedCourses.push(courseId);
    await findUser.save();
    res.status(200).json({ message: 'Course purchased successfully' });   
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic

    const response = User.findOne({username: req.user.username});

    const coursesList = Course.find({
        _id: {
            $in: response.purchasedCourses
        }
    });

    res.status(200).json({ courses: coursesList });
});

module.exports = router