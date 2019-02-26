//this is starting point of the program!
//I have to configure Node.js as a server
var express = require('express'); //we have just installed
var http = require('http'); //This comes with Node.js
//this is used to handle reading data from incoming request
var bodyParser=require('body-parser');
//to generate unique id
var uniqid = require('uniqid');


var app = express(); //Instantiating Express
//setting port number for  express
app.set('port', process.env.PORT || 4000);


//to upload file with node.js platform
const fileUpload = require('express-fileupload');

// default options
//fileUpload() method will act as a middleware or you can filer
app.use(fileUpload());

//To read data from incoming html form
app.use(bodyParser.urlencoded({ extended: false }));
//to read json data from request body 
app.use(express.json());
//Mapping static resource
//search-all-movies.htm
app.use('/',express.static(__dirname + '/public'));

//import for cors setting
require('./utils/cors-allow')(app);

//connecting to mongodb
var mongodbConn=require('./utils/mongo-connect');
mongodbConn();

///This is imported here
//profile-mapping file contains function definition 
var endPoint = express.Router();
//below is change because of versioning in rest
//require('./routes/movies-mapping')(app);
require('./routes/movies-mapping')(endPoint);

//here endpoint will be prefix with  v1
app.use('/api/v3', endPoint);


//Hey create one http server using app setting on which 
//port number define inside express!
http.createServer(app).listen(app.get('port'), function(){
    console.log('...........NodeJS server SOME listening on port.......... ' + app.get('port'));
    console.log('...........NodeJS server listening on port.......... ' + app.get('port'));
    console.log('...........NodeJS server listening on port.......... ' + app.get('port'));
    console.log('...........NodeJS server listening on port.......... ' + app.get('port'));
    //Adding dummy user
    //authService.addUser({});

});



