var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var visitorSchema = new Schema ({
    fullName: {
        type: String,
        require: true,
    },
    emailV: {
        type: String,
        require: true,
    },
    address:{
        type: String,
        require: true,
    },
    personVisit: {
        type: String,
        require: true,
    },
    homeOwnerAddress: {
        type: String,
        require: true,
    },
    purpose: {
        type: String,
        require: true,
    }

    
})

module.exports = mongoose.model('Visitor', visitorSchema)
