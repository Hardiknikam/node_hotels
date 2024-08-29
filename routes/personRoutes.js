const express =require('express');
const router = express.Router();
const person = require("./../models/person");

router.post("/",async(req,res) => {
    try{
     const data = req.body
     const newPerson = new person(data);
     const response = await newPerson.save();
     console.log('data saved');
     res.status(200).json(response);
  }catch(err){
     console.log(err);
     res.status(500).json({error : "Internal Server error"});
     }
 })

 
 router.get("/", async(req,res)=>{
    try{
        const data = await person.find();
        console.log('data fetch successfully ');
        res.status(200).json(data);
        
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Server error"});
    }
})

router.get("/:worktype",async(req,res)=>{
    try{ 
     const worktype = req.params.worktype;
     if(worktype == 'chef' || worktype == 'waiter' || worktype == 'manager'){
         const response = await person.find({work:worktype});
         console.log("responce fetched");
         res.status(200).json(response);

     }else{
         res.status(500).json({error : "Invalid work type"});
     }}catch(err){
         console.log(err);
         res.status(500).json({error : "Internal Server error"});
     }
 })

 router.put('/:id',async(req,res)=>{
    try{
        const personID = req.params.id;
        const updatePersonData = req.body;

        const response = await person.findByIdAndUpdate(personID,updatePersonData,{
            new:true,
            runValidators:true,
        })

        if (!response){
            return res.status(404).json({error:'person not found'});
        }

        console.log("Data Updated");
        res.status(200).json(response);

    }catch(err){
        console.log(err);
         res.status(500).json({error : "Internal Server error"});
    }
 })

 router.delete('/:id',async(req,res)=>{
    try{
        const personID = req.params.id;
        const response = await person.findByIdAndDelete(personID);
        if (!response){
            return res.status(404).json({error:'person not found'});
        }

        console.log("Data Deleted");
        res.status(200).json({message : 'person Deleted Successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error : "Internal Server error"});
    }
 })

 module.exports = router;