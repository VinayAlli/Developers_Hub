const mongoose=require('mongoose')

const task= new mongoose.Schema({
    taskprovider:{
        type:String,
        required:true,
    },
    taskworker:{
        type:String,
        required:true,
    }, 
    taskinfo:{
        type : String,
        required : true,
    }
})

module.exports = mongoose.model('taskschema',task)