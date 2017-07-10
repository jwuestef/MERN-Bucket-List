
// First import mongoose.
var mongoose = require("mongoose");

// Import the encryption module
var bcrypt = require("bcrypt-nodejs");




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


// Before a user is saved, run a function
userSchema.pre("save", function(next) {
	var user = this;

	// Call the generate-salt method out of the bcrypt module, and generate a salt... passed to function
	bcrypt.genSalt(10, function(err, salt) {
		if(err) {
			return next(err);
		};

		// Using the "hash" method from the bcrypt module, has the password and salt together... pass to function
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if(err) {
				return next(err);
			};

			// Set the password to this new hashed / encrypted password
			user.password = hash;
			next();
		});
	});

});


// The model will actually create new users and load the Schema into Mongoose. 
// This tells Mongoose that there is a new Schema called ‘userSchema’ which corresponds to a collection called 'user'(the first parameter).
var model = mongoose.model("user", userSchema);




module.exports = model;
