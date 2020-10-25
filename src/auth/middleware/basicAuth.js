'use strict';

const base64 = require('base-64');
const { networkInterfaces } = require('os');
const userCollection = require('../models/user-collection.js');

module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        next('Invalid Login')
    }
    else {
        const basicAuth = req.headers.authorization.split(' ').pop();
        const [username, pass] = base64.decode(basicAuth).split(':');
        userCollection
            .authenticateBasic(username, pass)
            .then((validUser) => {
                req.token = user.generateToken(validUser);
                next();
            })
            .catch((err) => next('Invalid Login'))
    }
} 