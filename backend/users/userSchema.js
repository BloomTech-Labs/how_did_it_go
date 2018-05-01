const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
   userName: {
     type: String,
     unique: true,
     required: true,
   },
   passwordHash: {
     type: String,
     required: true,
   },
});

module.exports = mongoose.models('User', UserSchema);