const mongoose = require('mongoose');

const EnterpriseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            max: 500,
        },
        materials: {
            type: Array,
            default: [],
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Enterprise", EnterpriseSchema);