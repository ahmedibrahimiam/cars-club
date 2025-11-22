const mongoose = require('mongoose');

const PartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name for the part'],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        maxlength: [500, 'Description can not be more than 500 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    stockQuantity: {
        type: Number,
        default: 0
    },
    imageUrl: {
        type: String,
        default: 'no-photo.jpg'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Part', PartSchema);