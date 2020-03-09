// implement your API here
const helpers = require("./data/db.js");
// we will write our API with express(barebones ilb for building web servers-Sinatra)
//STEP 1 , INSTALL EXPRESS
//STEP 2, IMPORT EXPRESS,commonjs syntax instead of natives ES modules
const express = require("express");
//STEP 3 INSTANTIATE APP
const app = express();
//STEP 4 "turn on the ability of the app to read req.body as json"
app.use(express.json());
//STEP 5 decide a port number
const PORT = 3333;
//STEP 6 make an endpoint on "/hello" [GET] that send back a json {"message":"hello"}
app.get(
  "/hello",
  (
    req, //req is the "objectified" version of the actual http request (piece of paper with 3 parts)
    res //res is the toolbox that allows to shape a response and sent it back to the client
  ) => {
    //set a success code of 200
    //send back a json response
    res.status(200).json({ message: "hello" });
  }
);

//STEP 6.5:build an endpoint [GET] "/api/users" and returns ALL users in the database
//we will take advantage of the "find"helper from the db.js file inside the data

// app.get('/users',async (req,res)=>{
//   const users= await helpers.find()
//   console.log(users);
//   res
//   .status(200)
//   .json({users})
// })
app.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});

//STEP 6.6 build and endpoint [GET] "/users/:id"
//sends back the users with the given id
//can find the id inside the req object
app.get("/users/:id", (req, res) => {
  //the id can be found inside req.params.id
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
      console.log(user);
      res.status(200).json(user);
      //IMPORTANT COMMENT
      //IF WE FORGET TO res.json AT SOME POINT
      //THE CLIENT WILL BE LEFT HANGING
      //UNTIL IT TIMES OUT

      //ANOTHER IMPORTANT COMMENT
      //IF WE re.json twice, thats be an error
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    });
  //the id can be found inside re.params.id
});

//STEP 6.7 build [POST] on"/users"
//to create a new user using the body of the request
//when a client does
//axios.post('http://localhost:3333/users',user).then().catch()
app.post("/users", (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    db.insert(user)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(error => {
        res.status(500).json({
          errorMessage:
            "There was an error while saving the user to the database"
        });
      });
  }
});
//[PUT] update user info
app.put("/users/:id", (req, res) => {
  const { name, bio } = req.body;
  const { id } = req.params;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for user " });
  } else {
    db.update(id, req.body)
      .then(user => {
        if (!user) {
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        } else {
          res.status(201).json(user);
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "The user information could not be modified" });
      });
  }
});

//[DELETE] user by id
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(user => {
      if (!user) {
        res
          .status(400)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.json(user);
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});

//STEP 7 make the express app listen on PORT
app.listen(PORT, () => {
  console.log(`Great! Listening on ${PORT}`);
});
