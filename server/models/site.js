const mongoose = require('mongoose');

const siteSchema = mongoose.Schema({
    featured:{
        type:Array,
        default:[]
    },
    siteInfo:{
        type:Array,
        default:[]
    }
});

const Site = mongoose.model('Site',siteSchema);

module.exports = Site 