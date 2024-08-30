const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true,
    },
    age:{
        type:Number
    },
    work :{
        type:String,
        enum:['chef','waiter','manager','owner'],
        required:true,
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    address:{
        type:String,
    },
    salary:{
        type:Number,
        required:true,
    },
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
})

personSchema.pre('save',async function (next) {
    const Person = this;

    if(!Person.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(Person.password,salt);

        Person.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isMatch = await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    } catch (error) {
        throw err;
    }
}



const person = mongoose.model('person',personSchema);
module.exports = person;