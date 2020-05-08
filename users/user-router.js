
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('./user-model');
// const session = require('express-session');
const restricted = require('../middleware/restricted');


router.post("/register", (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  }
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  db.add(user)
    .then(user => {
      res.json(user);
    }).catch(error => {
      console.log(error);
  }) 
})

router.post("/login", (req, res) => {
      const { username, password } = req.body;
    db.findBy({ username }).first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {

        req.session.user = user;

      res.status(200).json({message: `Welcome ${user.username}`})
      } else {
        res.status(401).json({ message: 'Invalid credentials !'});
      }
    
    }).catch(error => {
      console.log(error);
  })
})

router.get("/users", restricted(), async (req, res, next) => {
  db.find().then(members => {
    res.json(members);
  }).catch(error => {
    next(error);
  }) 
}
);

module.exports = router;