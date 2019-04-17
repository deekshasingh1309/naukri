const mongoose = require('mongoose');

enums = require('../enum');

const userSchema = mongoose.Schema({
    id: {type:Number,required:true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: true},
    location: { type: Object, required: true },
    roles: {
        type: Object,
        enums: []
    }
});


const jobSchema = mongoose.Schema({
    jobid: {type:Number,required:true},
    jobprofile: {type: String, required: true},
    companyid: {type:String, required:true},
    
});


const applySchema = mongoose.Schema({
    companyid: {type:Number,required:true},
    userid:{type:Number, required:true},
    status: {type: String, required: true},
});


module.exports ={
    first :mongoose.model("user", userSchema),
    second:mongoose.model("jobs", jobSchema),
    third: mongoose.model("apply", applySchema),
} ;