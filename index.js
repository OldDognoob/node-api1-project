// implement your API here
 const helpers = require('./data/db.js')
//Step 1 Install Express
const express = require("express");
//Step 2 Instantiate the app
const app = express()
// Step 3 "turn on the ability of the app to read req.body as json"
app.use(express.json())
//Step 4 decide a port number
const PORT = 3333

 // [POST] Create a new User
 app.post('/users',(req,res)=>{
  const{name, bio}= req.body;
  if(!name||!bio){
    res.status(400).json({errorMessage:"Please provide name and bio for the user."})
  }else{
    db.insert(user)
    .then(user =>{
      res.status(201).json(user)
    })
    .catch(error =>{
      res.status(500).json({errorMessage:"There was an error while saving the user to the database"})
    });
  }
 })

//[GET]
//Returns an array of all the user objects contained in the database.
app.get('/users',(req,res)=>{
  
})


















 //STEP 7 make the express app listen on PORT
app.listen(PORT,()=>{
  console.log(`Great! Listening on ${PORT}`);
})