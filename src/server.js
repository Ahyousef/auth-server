'use strict'

// Setup and global Middleware
const express = require('express')
const app = express();
const cors = require('cors');




// Initialize
app.use(express.json());
app.use(cors())
app.use(express.json());

// Export
module.exports = {
    server: app,
    start: (port) => {
        app.listen(port, () => {
            console.log(`Server running on port: ${port}`);
        });
    },
};