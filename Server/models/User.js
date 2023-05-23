const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            max: 500,
        },
        lastName: {
            type: String,
            max: 500,
        },
        mail: {
            type: String,
            max: 500,
        },
        password: {
            type: String,
            max: 500,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema, 'users');