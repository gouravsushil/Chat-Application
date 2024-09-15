// This file contains the functions that will be called when the routes are hit. The functions will interact with the database and return the response to the client. These functions are API endpoints.

const User = require('../model/userModel');
const bcrypt = require('bcrypt');  // Import bcrypt to hash passwords or encryption of passwords


module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await user.findOne({ username });
        if (usernameCheck) {
            return res.json({ message: "Username already exists", status: false });
        }
        const emailCheck = await user.findOne({ email });
        if (emailCheck) {
            return res.json({ message: "Email already exists", status: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password. The second argument is the saltRounds which is 10 in this case. SaltRounds is the number of rounds the password will be hashed. The higher the number, the more secure the password will be. The default value is 10. 

        const user = await User.create({ // Create a new user in the database which is like inserting a new row in the database
            username,
            email,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({ status: true, user })
    }
    catch (err) {
        next(err);
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await user.findOne({ username });
        if (!user) {
            return res.json({ message: "Incorrect username or password", status: false });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password); // Compare the password with the hashed password in the database
        if (!isPasswordValid) {
            return res.json({ message: "Incorrect username or password", status: false });
        }
        delete user.password;

        return res.json({ status: true, user })
    }
    catch (err) {
        next(err);
    }
}

module.exports.setAvatar = async (req, res, next) => {
    try {
        // const user = new User({ username, password });
        // await user.save();
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage: avatarImage,
        }, { new: true });
        // await user.save();

        return res.json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage });
    } catch (ex) {
        next(ex);
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email", "username", "avatarImage", "_id"
        ]);
        return res.json(users);
    } catch (ex) {
        next(ex);
    }
};