'use strict'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { model } = require('./user-model.js');


const SECRET = process.env.SECRET || 'mysecret';
const userModel = require('./user-model.js');

class userCollection {
    constructor() { }

    async save(record) {
        let userObj = userModel.find({ username: record.username })
        if (userObj.length == 0) {
            record.password = await bcrypt.hash(record.password, 5);
            const newRecord = new userModel(newRecord);
            return newRecord.save();
        }
        return Promise.reject();
    }
    async authenticateBasic(record) {
        let userObj = await userModel.find(record.username);
        const valid = await bcrypt.compare(record.password, userObj.password);
        return valid ? userObj : Promise.reject();
    }

    generateToken(record) {
        const token = jwt.sign({ username: record.username }, SECRET);
        return token;
    }
    list(){
        let allUsers = userModel.find({})
        return allUsers
    }
}

model.exports = new userCollection();