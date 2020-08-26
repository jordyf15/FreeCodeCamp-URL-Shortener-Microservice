const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const urlSchema= new Schema({
    original_url: {type: String, unique: true},
    short_url: Number
});
module.exports=mongoose.model('url',urlSchema);