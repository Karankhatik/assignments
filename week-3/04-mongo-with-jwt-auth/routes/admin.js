const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const {username, password, role} = req.body;

    // check if a user with this username already exists
    if(username && password && role) {
        const findAdmin = await Admin.findOne({username});
        if(findAdmin) {
            res.status(400).json({
                message: 'Admin already exists'
            })
        }else {
            const newAdmin = await Admin.create({
                username: username,
                password: password,
                role: role
            })
            res.status(200).json({
                message: 'Admin created successfully'
            })
        }
    }
});

router.post('/signin', (req, res) => {
    const {username, password} = req.body;    
    
    if(username && password) {
        const findAdmin = Admin.findOne({username});

        if(findAdmin.username === username && findAdmin.password === password) {
            const payload = {
                username: findAdmin.username,
                role: findAdmin.role
            }

            const token = generateToken(payload);
            res.status(200).json({message: 'User logged in successfully', token:token });
        }
    }
})

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic    

    const {title, description, imageLink, price, published} = req.body;

    const newCourse = Course.create({
        title,
        description,
        imageLink,
        price,
        published
    });

    res.status(200).json({ message: 'Course created successfully', courseId: newCourse._id });

});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic

    const response = Course.find({});

    if(!response) {
        res.status(404).json({ message: 'No courses found' });
    }

    res.status(200).json({ courses: response });
});

module.exports = router;