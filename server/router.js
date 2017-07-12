// Import authorization middleware
var Auth = require("./controllers/auth");

// Import our passport authentication middleware
var passportService = require("./services/passport");

// Import passport functionality
var passport = require("passport");


// MIDDLEWARE
// By default the .authenticate method wants to make a cookie. 
// Since we’re using jwt, we don’t want a cookie. Hence, we set the first parameter to ‘jwt’ and the second to this: {session: false}.
var requireAuth = passport.authenticate("jwt", {session: false});
// Use the local strategy for signing in
var requireSignin = passport.authenticate("local", {session: false});




module.exports = function(app) {


	app.get("/", requireAuth, function(req, res) {
		// res.send("Hello Homepage");
		res.send({message: "hey"});
	});




	app.post("/signup", Auth.signup);


	app.post("/signin", requireSignin, Auth.signin);


}