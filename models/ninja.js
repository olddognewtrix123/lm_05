const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create ninja schema and model
const NinjaSchema = new Schema({
    name: {
        type:String,
        required:[true,'A question is required']
    }
})


// mongoose will create a collection called 'ninjas' in the database
const Ninja = mongoose.model('ninja', NinjaSchema);

// export so it can be used in other fields
module.exports = Ninja;