const mongoose = require("mongoose");
require('dotenv').config();

let mongoDB = process.env.DB_CONNECTION;

module.exports = mongoose.connect(mongoDB);