const mongoose = require('mongoose');

const FurnitureSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            max: 500,
        },
        materials: {
            type: Array,
            default: [],
        },
        category: {
            type: String,
            max: 500,
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Furniture", FurnitureSchema, 'furnitures');