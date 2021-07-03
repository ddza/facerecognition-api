const e = require('express');
const express = require('express');
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const { response } = require('express');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

 const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'heimdal',
      database : 'smart-brain'
    }
  });

// db.select('*').from("users").then(data=>{
//     console.log(data)
// });


const app = express();

app.use(express.json());
app.use(cors());

// const database = {
//     users:[
//         {
//             id: "123",
//             name: "Jhon", 
//             email: "john@gmail.com", 
//             password :"cookies",
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: "124",
//             name: "Sally", 
//             email: "sally@gmail.com", 
//             password :"secret",
//             entries: 0,
//             joined: new Date()
//         }
//     ], 
//     login: [
//         {
//             id: "987", 
//             hash: "",
//             email: "john@gmail.com"
//         }
//     ]
// }

app.get("/", (req, res)=>{
    res.send("success")
})

//signin
app.post("/signin",signin.handleSignin (db, bcrypt))

//register
app.post("/register", (req, res) => {register.handleRegister(req, res, db, bcrypt)})

//profile

app.get("/profile/:id", (req, res)=>{profile.handleProfileGet(req, res, db)} )

//image
app.put("/image", (req, res)=>{image.handleImage(req, res, db)});
app.post("/imageurl", (req, res)=>{image.handleApiCall(req, res)});

app.listen(3001, ()=>{
    console.log("app is running on port 3000")
})

/*
/ -->res return(=) this is working
/signin --> POST  = success/fail
/register -->POST  = user
/profile/:userId --> GET = user
/image --> PUT --> user


*/