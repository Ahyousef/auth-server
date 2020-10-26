'use strict';

const superagent = require('superagent');

const userCollection = require('../models/user-collection')
// this will be used to exchange the code for token (from docs)
const tokenServerUrl = 'https://github.com/login/oauth/access_token';
// this will be used to get the user info by passing the token from the tokenserver (from docs)
const remoteAPI = 'https://api.github.com/user';
// this optend from the Outh app created on GH
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const API_SERVER = process.env.API_SERVER;
console.log(userCollection);

module.exports = async (req, res, next) => {
    const code = req.query.code;
    console.log('1. CODE', code);
    const access_token = await exchangeCodeForToken(code);
    console.log('2. TOKEN', access_token);
    const remoteUser = await getRemoteUserInfo(access_token);
    console.log('3. REMOTE USER \n', remoteUser);
    const [user, token] = await getUser(remoteUser);
    console.log('USER & TOKEN', user, token);
    req.user = user;
    req.token = token;
    next();
    try {
    } catch (err) {
        next(`ERROR ${err.message}`);
    }
};

// After the popup send the code to GH for Token
async function exchangeCodeForToken(code) {
    const tokenResponse = await superagent.post(tokenServerUrl).send({
        code: code, //cc38c16c9991502a7891
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: API_SERVER,
        grant_type: 'authorization_code',
    });
    return tokenResponse.body.access_token;
}
// get user info from GH by providing the access_token
async function getRemoteUserInfo(token) {
    const userResponse = await superagent
        .get(remoteAPI)
        .set('Authorization', `token ${token}`)
        .set('user-agent', 'express-app');

    return userResponse.body;
}
// save the remote user to the db
async function getUser(remoteUser) {
    const record = {
        username: remoteUser.login,
        password: 'oauthpassword', //this can be anything (it will be hashed)
    };
    console.log(record);
    const user = await userCollection.OAuth(record);
    console.log(user);
    const token = userCollection.generateToken(user);
    return [user, token];
}