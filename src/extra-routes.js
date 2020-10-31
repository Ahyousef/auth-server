'use strict'

const express = require('express');
const router = express.Router();
const bearer = require('./auth/middleware/bearer-auth.js')
const acl = require('./auth/middleware/acl.js');

router.get('/secret', bearer, (req,res) => {res.send('Access granted.')} );
router.get('/read',bearer,acl('create'),readHandler)
router.post('/add',bearer,acl('create'),createHandler)
router.put('/change',bearer,acl('update'),updateHandler)
router.delete('/remove',bearer,acl('delete'),deleteHandler)

function readHandler(req,res){
    res.send('OK!');
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