// Import authorization middleware
var Auth = require("./controllers/auth");

// Import the user model
var User = require("./models/user");





module.exports = function(app) {


	app.post("/signup", Auth.signup);


}