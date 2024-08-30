    const express = require("express");
    // const { size } = require("lodash");
    const app = express();
    const db = require("./db");
    require('dotenv').config();
    const passport = require('./auth');
    
   

    const bodyParser = require("body-parser");
    app.use(bodyParser.json());
    
    const PORT = process.env.PORT || 3000;
    
    const logRequest = (req,res,next) => {
        console.log(`[${new Date().toLocaleString()}] Request Made to :${req.originalurl}`);
        next();
    }

  
    
    // app.use(passport.initialize);

    // const { error } = require("console");
    app.use(logRequest);

    app.use(passport.initialize());
    const localAuthMiddleware = passport.authenticate('local',{session:false});
    app.get("/",function(req,res){
        res.send("welcome to my Hotel")
    })

     
  const personRoutes = require('./routes/personRoutes');
  const menuItemRoutes = require('./routes/menuItemRoutes');


  app.use('/person',localAuthMiddleware,personRoutes);
  app.use('/menu',menuItemRoutes);



    app.listen(3000, ()=>{
        console.log("Server is running on port 3000");
    });