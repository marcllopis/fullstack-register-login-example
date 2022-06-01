require("dotenv").config();
const connection = require("./conf");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { sendStatus } = require("express/lib/response");
// use the port from env file, if not available switch to port 5000 as default
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// establish the connection to the MySQL db with credentials from config.js
connection.connect((err) => {
  if (err) {
    console.error(`ERROR!!! Connection to the db failed: ${err}`);
    return;
  }
  console.log("Great! Your DB connection is working!");
});

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// path to REGISTER a new user
app.post("/register", (req, res) => {
  // we will receive the user info from the frontend/postman

  bcrypt
    .hash(req.body.password, 10)
    .then((encryptedPassword) => {
      let newUser = {
        email: req.body.email,
        password: encryptedPassword,
        name: req.body.name,
        city: req.body.city,
        age: req.body.age,
      };
      // connect to the DB with .query() method to insert this info into our users table
      connection.query("INSERT INTO users SET ?", newUser, (err) => {
        if (err) {
          res
            .status(500)
            .send("Server error, could not register the new user into the DB");
        } else {
          res.status(201).send("Successfully registered the new user");
        }
      });
    })
    .catch((hashError) =>
      console.error(
        `There was an error encrypting the password. Error: ${hashError}`
      )
    );
});

// path to LOGIN into the app
app.post("/login", (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  connection.query(
    "SELECT * FROM users WHERE email=?",
    user.email,
    (err, results) => {
      if (err) {
        res.status(500).send("Email not found");
      } else {
        bcrypt
          .compare(user.password, results[0].password)
          .then((isAMatch) => {
            if (isAMatch) {
              const generatedToken = jwt.sign(
                user,
                process.env.ACCESS_TOKEN_SECRET
              );
              res.status(200).json({
                message: "Successfully logged in!",
                token: generatedToken,
                loggedIn: true,
              });
            } else {
              res.status(500).send("Wrong password");
            }
          })
          .catch((passwordError) =>
            console.error("Error trying to decrypt the password")
          );
      }
    }
  );
});

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  // check if the user has a token
  if (token === undefined) return res.sendStatus(401);
  // check that it is a valid token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    // finally if theres no errors we go to the next middleware
    req.foundUser = user;
    next();
  });
};

app.get("/profile", authenticateUser, (req, res) => {
  // here we have access to what we did on the req object in the middleware
  connection.query(
    "SELECT email, name, city, age from users WHERE email =?",
    req.foundUser.email,
    (err, results) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json(results[0]);
      }
    }
  );
});

app.listen(port, (err) => {
  if (err) {
    // create & throw into the terminal a new datatype Error
    throw new Error(
      "Sorry, looks like something is not working as expected :/"
    );
  }
  console.log(`Great success! Your server is running at port: ${port}`);
});
