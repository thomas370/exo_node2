const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            max: 500,
        },
        enterprise: {
            type: String,
            max: true,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Material", MaterialSchema);