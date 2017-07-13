
var BucketList = require("../models/bucketlist");


exports.addBucketList = function(req, res, next) {

	console.log("addBucketList called!")

	// For Postman use:
		// var title = req.body.title;
	var title = req.body.props.title;
	var topic = req.body.props.topic;
	var url = req.body.props.url;
	var content = req.body.props.content;
	var specificUser = req.user._id;


	var bucketList = new BucketList({
		title: title,
		topic: topic,
		url: url,
		content: content,
		specificUser: specificUser
	});


	bucketList.save(function(err) {
		if(err) {
			console.log("Error in bucketlist.save");
			return next(err);
		};

		res.json(bucketList);
	});


};