
// Add in the neccessary modules, the User model, and the config/secret
var passport = require("passport");
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var User = require("../models/user");  // Has mongoose inside it, no need to require it here too
var config = require("../config");




// Initialize the jwtOptions
var jwtOptions = {
	// This line tells where to get the token from in a request. Here it is extracted from a Header section called authorization
	jwtFromRequest: ExtractJwt.fromHeader("authorization"),
	// This line says that we need to get a secret key from our config file
	secretOrKey: config.secret
};




// Create jwt strategy
// Payload parameter is the decoded jwt token. It corresponds to data gleaned from the createUserToken function in auth.js from sub & iat.
var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	// Uses mongoose method findById to search User database for the "sub" property (the user.id from auth.js)
	User.findById(payload.sub, function(err, foundUser) {
		// Err is populated only if the search fails for some DB reason, outside of a user simply not existing
		if(err) {
			return done(err, false);
		};

		if(foundUser) {
			// If we can find the user, pass it to the callback - they ARE authenticated
			done(null, foundUser);
		} else {
			// If we didn't get a foundUser back, then return null-error and authenticated-false
			done(null, false);
		};
	});
});




// Tell passport to use our fancy authentication function
passport.use(jwtLogin);