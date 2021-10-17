var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var suggestionSchema = new Schema({
    name:{
        type: String,
        require: true,
        unique: true,
    },
    suggestions: {
        type: String,
        require: true,
    }
})

module.exports = mongoose.model('Suggestion', suggestionSchema)
