const mongoose = require("mongoose");
require('dotenv').config(); 


const mongoURL = process.env.MONGODB_URL;
// const mongoURL = "mongodb+srv://hardiknikam73:<Haru@1391>@cluster0.pcjh8.mongodb.net/"

// const mongoURL = "mongodb://localhost:27017/hotels"
mongoose.connect(mongoURL,{
    useNewUrlParser : true,
    useUnifiedTopology:true,
})
 
const db = mongoose.connection;

db.on('connected',()=>{
    console.log("connted to mongo db server");
})

db.on('error',(err)=>{
    console.log("mongo db connection error",err);
})

db.on('disconnected',()=>{
    console.log("mongo db disconnected ")
})

module.exports = db;