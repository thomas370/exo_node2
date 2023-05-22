const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            max: 500,
        },
        furnitures: {
            type: Array,
            default: [],
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Category", CategorySchema);