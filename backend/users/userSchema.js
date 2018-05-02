const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema ({
   username: {
     type: String,
     unique: true,
     required: true,
   },
   password: {
     type: String,
     required: true,
   },
});

// Add on "pre save"
// use bcrypt to encrypt plain password, and pass hashed PW to next middleware
UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 11, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

UserSchema.methods.checkPassword = function(potentialPW, cb) {
  bcrypt.compare(potentialPW, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;