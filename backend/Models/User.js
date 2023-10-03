// It's crucial to hash passwords before storing them in the database for security reasons. 
// You can use the bcrypt library to achieve this.
// 1st Collection = usermodel --> container --> name,email & password for user AUTHENTICATION

const mongoose = require("mongoose")
const bcrypt = require("bcrypt"); // npm i bcrypt

const userSchema = new mongoose.Schema ({
    name: {
    type: String,
    required : true,
   },
   email: {
    type: String,
    required: true,
    unique: true, // --> each email should be unique in the DB
   },
   password: {
    type: String,
    required: true,
   },
});


// hash password using bcrypt before save it in DB [during registration]
userSchema.pre("save", async function(next) {
   if (!this.isModified("password")) return next(); //agar pswd modified nhi hua to hum kch nhi krege
 
     const salt = await bcrypt.genSalt(10);
     this.password  = await bcrypt.hash(this.password, salt);
     next();
 });

usermodel =  new mongoose.model("usermodel", userSchema); 
module.exports = usermodel; 