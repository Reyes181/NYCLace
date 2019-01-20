const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
        maxlength: 100
    },
    shoesize: {
       type: Number
    },
    clothesize: {
       type: String
    },
    quantity: {
      required: true,
      type: Number  
    },
    colors:{
        required: true,
        type: [String]
    },
    color:{
        type: [String]
    },
    style:{
        required: true,
        type: String
    },
    model:{
      type: String  
    },
    description:{
        required: true,
        type: String,
        maxlength: 100000
    },
    price:{
        required: true,
        type: Number,
        maxlength: 200
    },
    brand:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    shipping:{
        required: true,
        type: Boolean
    },
    available:{
        required: true,
        type: Boolean
    },
    footwear:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Footwear',
        required: true
    },
    sold:{
        type: Number,
        maxlength: 100,
        default: 0
    },
    publish:{
        required: true,
        type: Boolean
    },
    images:{
        type: Array,
        default: []
    }
},{timestamps:true});

const Product = mongoose.model('Product',productSchema);

module.exports =  Product;