//Mongoose is used to create a schema for the user model. The schema contains the username, email, password, isAvatarImageSet, and avatarImage fields. The username and email fields are required, and the username and email fields must be unique. The password field is required and must be at least 8 characters long. The isAvatarImageSet field is a boolean field that is set to false by default. The avatarImage field is a string field that is set to an empty string by default. The user model is exported to be used in other files. The user model is used in the usersController.js file to create a new user in the database, login a user, and set the avatar image for a user.
//Mongoose is used for working with MongoDB in Node.js. Mongoose provides a schema-based solution to model the application data. Mongoose is used to define the schema for the user model. The schema defines the structure of the documents that can be stored in the database. The schema defines the fields that are present in the document, the type of each field, and the validation rules for each field. The schema is used to create a model for the user collection in the database. The model is used to interact with the user collection in the database. The model provides methods for creating, reading, updating, and deleting documents in the user collection. The model is used in the usersController.js file to create a new user in the database, login a user, and set the avatar image for a user.

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        message: {
            text: {
                type: String,
                required: true,
            },
        },
        users: Array,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Messages", messageSchema);