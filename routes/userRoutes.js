// This file contains the routes for the user model. From here the post request for registering and logging in a user will be handled. The routes will interact with the controller functions to perform the necessary operations. The routes will also handle the setting of the user's avatar and getting all users from the database.

const router = require('express').Router();
const User = require('../model/userModel');
const { setAvatar, getAllUsers } = require('../controllers/usersController');

// Define the register function
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password }); // Example user data
        const savedUser = await newUser.save(); // Save the user to the database
        res.status(201).json(savedUser);

    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.post('/login', async (req, res) => {
    try {
        const { _id, username, password } = req.body;
        const user = await User.findOne({ username });// Find the user in the database

        if (!user) {
            return res.status(400).send('User not found');
        }
        if (user.password !== password) {
            return res.status(400).send('Invalid password');
        }
        // res.status(200).send('Login successful');
        // localStorage.setItem('chat-app-user', JSON.stringify(user));
        res.status(200).json({ success: true, message: 'Login successful', user: { id: user._id, username: user.username, password: user.password } });

    } catch (error) {
        res.status(500).send('Server error');
    }

});

// router.post('/setAvatar/:id', async (req, res) => {
//     try {
//         const { avatarImage } = req.body;
//         const userId = req.params.id;
//         const user = await User.findById(userId, {
//             isAvatarImageSet: true,
//             avatarImage: avatarImage,
//         }, { new: true });
//         if (!user) {
//             return res.status(400).send('User not found');
//         }
//         // user.avatarImage = avatarImage;
//         // await user.save();
//         return res.status(200).json({ isSet: user.isAvatarImageSet, image: user.avatarImage });
//     } catch (error) {
//         res.status(500).send('Server error');
//     }
// });


router.post('/setAvatar/:id', setAvatar);

router.get('/allusers/:id', getAllUsers);
module.exports = router;

