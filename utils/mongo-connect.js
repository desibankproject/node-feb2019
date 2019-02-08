/**
 *  This fill will make a
 *  connection to the database
 *  This file is known as module
 */
var mongoose = require('mongoose');

module.exports=function() {
    //below code is used to connect with mongodb using mongoose
    var conn = mongoose.connection;
	conn.on('error', console.error);
	conn.once('open', function() {
		//	Create your schemas and models here.
		console.log("Opening connection to database!");
		console.log("MongoDB Database is ready to store data");	
    });
    //hey connect with mongodb
	mongoose.connect('mongodb://localhost:27017/movies_db');
};
