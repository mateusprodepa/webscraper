const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
   username: String,
   email: String,
   password: String,
   salt: String,
   tags: {
      type: Array,
      default: []
   },
   bookmarks: {
      type: Array,
      default: []
   }
})

userSchema.methods.setPassword = function(password) {
   this.salt = crypto.randomBytes(16).toString('hex');
   this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

userSchema.methods.validatePassword = function(password) {
   const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
   return this.password === hash;
}

userSchema.methods.generateJWT = function() {
   const today = new Date();
   const expirationDate = new Date(today);
   expirationDate.setDate(today.getDate() + 60);

   return jwt.sign({
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
   }, 'Id0n\'t4ctv4llyC4re');
}

userSchema.methods.toAuthJSON = function() {
   return {
     _id: this._id,
     email: this.email,
     token: this.generateJWT(),
   };
 };

module.exports = mongoose.model('User', userSchema);