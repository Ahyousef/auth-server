'use strict'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const roles = {
    user: ['read'],
    writer: ['read', 'create'],
    editor: ['read', 'create','update'],
    admin: ['read', 'create', 'update', 'delete'],
  };

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
            console.log('new user');
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
            if (this.authenticateBasic(record)) {
                return record
            }

        }
    }
    generateToken(record) {
        const token = jwt.sign({ username: record.username,capabilities: roles[record.role] }, SECRET, {expiresIn:900000});
        return token;
    }
    list() {
        let allUsers = userModel.find({})
        return allUsers
    };
    async authenticateToken(token) {
        try {
            const tokenObject = jwt.verify(token, SECRET);
            console.log('TOKEN OBJECT', tokenObject);
            let userObj;
            await userModel.findOne({ username: tokenObject.username }, function (err, users) {
                userObj = users;
            })
            if (userObj) {
                return Promise.resolve(tokenObject);
            } else {
                ``
                return Promise.reject();
            }
        }
        catch (e) {
            return Promise.reject(e.message);
        }
    };
}

module.exports = new userCollection();