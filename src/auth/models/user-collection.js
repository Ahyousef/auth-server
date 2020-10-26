'use strict'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const SECRET = process.env.SECRET || 'mysecret';
const userModel = require('./user-model.js');

class userCollection {
    constructor() { }

    async save(record) {
        let userObj;
        await userModel.findOne({ username: record.username }, function (err, users) {
            userObj = users;
        })
        if (userObj == null) {
            record.password = await bcrypt.hash(record.password, 5);
            const newRecord = new userModel(record);
            return newRecord.save();
        }
        return Promise.reject('user already exists');
    }
    async authenticateBasic(record) {
        let userObj;
        await userModel.findOne({ username: record.username }, function (err, users) {
            userObj = users;
        })
        const valid = await bcrypt.compare(record.password, userObj.password);
        return valid ? userObj : Promise.reject();
    }
    async OAuth(record) {
        let userObj;
        await userModel.findOne({ username: record.username }, function (err, users) {
            userObj = users;
        })
        if (userObj == null) {
            record.password = await bcrypt.hash(record.password, 5);
            const newRecord = new userModel(record);
            return newRecord.save();
        }
        else {
            console.log('user exists');
            if(this.authenticateBasic(record)){
                return record
            }
            
        }
    }
    generateToken(record) {
        const token = jwt.sign({ username: record.username }, SECRET);
        return token;
    }
    list() {
        let allUsers = userModel.find({})
        return allUsers
    }
}

module.exports = new userCollection();