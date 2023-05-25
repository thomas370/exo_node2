const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            max: 500,
        },
        enterprise: {
            type: String,
            max: 500,
        },
        desc: {
            type: String,
            max: 10000,
        },
        img: {
            type: String,
            max: 500,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Material", MaterialSchema, 'materials');