const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
   userName: {
     type: String,
     unique: true,
     required: true,
   },
   password: {
     type: String,
     required: true,
   },
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;