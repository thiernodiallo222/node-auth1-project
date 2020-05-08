const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");
const session = require('express-session');

const usersRouter = require("../users/user-router");


server.use(session({
  // name: 'cookie monster',
  secret: 'this is my secret sentence !',
  saveUninitialized: false,
  resave: false,
  
   cookie:{
  maxAge: 1000 * 60 * 60 * 24 * 365, // duration for one year
  secure:false, // should be true in production to allow only https
  httpOnly: true
  },
}));

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api", usersRouter);

server.get("/", (req, res) => {
  res.json(`API is up and running !`);
});

module.exports = server;