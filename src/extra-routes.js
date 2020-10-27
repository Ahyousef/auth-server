'use strict'

const express = require('express');
const router = express.Router();
const bearer = require('./auth/middleware/bearer-auth.js')

router.get('/secret', bearer, (req,res) => {res.send('Access granted.')} );

module.exports = router;