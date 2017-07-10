
// Import the user model
var User = require("../models/user");


exports.signup = function(req, res, next) {


	// Pull variables out of the signup request
	var email = req.body.email;
	var password = req.body.password;

	// Make sure both fields are filled in
	if(!email || !password) {
		return res.status(400).send({error: "You must provide both and email and password"});
	};

	// Goes through the database attempting to find one instance of a specific email address. 
	// So it will look through all users and see if a user with the given email exists.
	User.findOne({email: email.toLowerCase()}, function(err, foundExistingUser) {

		if(err) {
			return next(err);
		};

		if(foundExistingUser) {
			return res.status(418).send("Email is already in use");   // status 409 is "conflict"
		};

		// Create a new user with said information
		var newUser = new User({
			email: email,
			password: password
		});

		// Saves the new user to the database
		newUser.save(function(err) {
			if(err) {
				return next(err);
			};
			// Respond to request indicating the user was created
			res.json({success: true});
		});

	});







}