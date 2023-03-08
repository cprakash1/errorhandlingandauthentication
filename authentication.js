const mongoose=require('mongoose');
const schema = mongoose.Schema;

const authentication=new schema({
    user:{
        type:String,
        required:[true,'Bosdike name to input kar le']
    },pass:{
        type:Number,
        required:[true,'pass tera baap likhega'],
        min:0
    }
});

module.exports=mongoose.model('authentication',authentication);