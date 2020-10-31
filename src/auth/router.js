'use strict'

const express = require('express');
const router = express.Router();
const userCollection = require('./models/user-collection')
const basicAuth = require('./middleware/basicAuth.js')
const oauth = require('./middleware/oauth.js');
const bearer = require('./middleware/bearer-auth.js')
const acl = require('./middleware/acl.js');
router.post('/signup', signupHandler);
router.post('/signin', basicAuth, signinHandler);
router.get('/users',basicAuth, usersHandler);
router.get('/oauth', oauth, (req, res) => {
    res.json({ token: req.token });
  });
router.post('/create',bearer,acl('create'),createHandler)
router.put('/update',bearer,acl('update'),updateHandler)
router.delete('/delete',bearer,acl('delete'),deleteHandler)


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
function createHandler(req,res){
    res.status(201).send('OK!');
}
function updateHandler(req,res){
    res.send('OK!');
}
function deleteHandler(req,res){
    res.send('OK!');
}

module.exports = router;