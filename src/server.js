'use strict'

// Setup and global Middleware
const express = require('express')
const app = express();
require('dotenv').config()
const router = require('./auth/router')
const extraRouter = require('./extra-routes.js')
const cors = require('cors');




// Initialize
app.use(express.json());
app.use(cors())
app.use(router)
app.use(extraRouter)

app.use(express.static('./public'));
// Export
module.exports = {
    server: app,
    start: (port) => {
        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        });
    },
};