/* Signup process where the user will give: 
- email (required)
- password (required)
- name
- city
- age

Then the user will log in using their email & password */

require('dotenv').config()
const connection = require('./conf');
const express = require('express');
const app = express();
// use the port from env file, if not available switch to port 5000 as default
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// establish the connection to the MySQL db with credentials from config.js
connection.connect((err) => {
  if(err) {
    console.error(`ERROR!!! Connection to the db failed: ${err}`);
    return;
  }
  console.log("Great! Your DB connection is working!")
})

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
})

// path to REGISTER a new user
app.post("/register", (req, res) => {
  // we will receive the user info from the frontend/postman
  let newUser = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name ,
    city: req.body.city,
    age: req.body.age
  }
  // connect to the DB with .query() method to insert this info into our users table
    connection.query("INSERT INTO users SET ?", newUser, (err) => {
      if(err) {
        res.status(500).send("Server error, could not register the new user into the DB");
      } else {
        res.status(201).send("Successfully registered the new user");
      }
    })
})

// path to LOGIN into the app
app.post("/login", (req, res) => {
  connection.query(
    `SELECT * FROM users WHERE email='${req.body.email}' AND password=${req.body.password}`, (err, results) => {
    if(err) {
      res.status(500).send("Internal server error");
      // SQL sends the results of a query in an array
    } else if(results.length === 0) {
      res.status(500).send("Sorry, there is no user with this email and password in the DB.");
    } else {
      res.status(200).json({
        userId: results[0].id,
        message: "Successfully logged in!",
        token: "3q2tj3ghj320g23gj2mgh",
        loggedIn: true,
      });
    }
  })
})

app.listen(port, (err) => {
  if(err) {
    // create & throw into the terminal a new datatype Error
    throw new Error("Sorry, looks like something is not working as expected :/");
  }
  console.log(`Great success! Your server is running at port: ${port}`);
})
