
// First import mongoose.
var mongoose = require("mongoose");



// Create Schema variable. A Schema will tell mongoose about particular fields our models will have.
var Schema = mongoose.Schema;

// This Schema is going to help us tell Mongoose that we are passing an email and a password for our new users.
var userSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true
	},
	password: String
});


// The model will actually create new users and load the Schema into Mongoose. 
// This tells Mongoose that there is a new Schema called ‘userSchema’ which corresponds to a collection called 'user'(the first parameter).
var model = mongoose.model("user", userSchema);




module.exports = model;
