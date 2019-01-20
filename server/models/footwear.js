const mongoose = require('mongoose');

const footwearSchema = mongoose.Schema({
    style:{
        required: true,
        type: String,
        unique: 1,
        maxlength: 50
    }
});

const Footwear = mongoose.model('Footwear',footwearSchema);

module.exports = Footwear;