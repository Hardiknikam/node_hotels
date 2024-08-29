const mongoose = require('mongoose');
const { type } = require('os');

const menuItemSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    price :{
        type : Number,
        required : true,
    },
    taste : {
        type : String,
        enum: ['sweet','spicey','sour'],
        required : true,
    },
    is_drink : {
        type : Boolean,
        default : false,
    },
    ingredients : {
        type : [String],
        default : [],
    },
    num_sale:{
        type : Number,
        default : 0,
    }
})

const MenuItem = mongoose.model('MenuItem',menuItemSchema);
module.exports = MenuItem;