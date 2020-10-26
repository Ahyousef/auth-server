'use strict'

const express = require('express');
const router = express.Router();
const userCollection = require('./models/user-collection')
const basicAuth = require('./middleware/basicAuth.js')
const oauth = require('./middleware/oauth.js');
router.post('/signup', signupHandler);
router.post('/signin', basicAuth, signinHandler);
router.get('/users',basicAuth, usersHandler);
router.get('/oauth', oauth, (req, res) => {
    res.json({ token: req.token });
  });


function signupHandler(req, res) {
    userCollection.save(req.body)
        .then((user) => {
            const token = userCollection.generateToken(user);
            res.json({ token });
        })
}

function signinHandler(req, res) {
    res.json({ token: req.token })
}



function usersHandler(req,res){
    let allUsers = user.list();
    res.json(allUsers)
}

module.exports = router;