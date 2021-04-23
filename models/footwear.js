const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const footwearSchema = new Schema({
    pid: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
    },
    category: {
        type: String,
    },
    name: {
        type: String,
    },
    size: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    cost_price: {
        type: Number,
    },
    selling_price: {
        type: Number,
    },
}, { collection: 'footwear' });

const Footwear = mongoose.model('footwear', footwearSchema);

module.exports = Footwear;