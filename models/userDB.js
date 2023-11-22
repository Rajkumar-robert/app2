// models/userDB.js

const mongoose = require('mongoose');

const userDBSchema = new mongoose.Schema({
  username: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

const UserDB = mongoose.model('UserDB', userDBSchema, 'userData'); // Specify the collection name

module.exports = UserDB;
