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


//To read data from incoming html form
app.use(bodyParser.urlencoded({ extended: false }));
//to read json data from request body 
app.use(express.json());
//Mapping static resource
//search-all-movies.htm
app.use('/',express.static(__dirname + '/public'));

//Importing schema..
var MovieEntity=require('./odm/movie-entity');

//connecting to mongodb
var mongodbConn=require('./utils/mongo-connect');
mongodbConn();

//@RequestMapping
//@GetMapping("/")
//
app.get("/",function(req,res) {
    //Forwarding request from node to html page
    res.sendFile(__dirname +"/public/search-all-movies.htm");     
});

app.get("/uploadMovie",function(req,res) {
    //Forwarding request from node to html page
    res.sendFile(__dirname +"/public/movie.htm");     
});


app.post("/movies",function(req,res) {
    //request.getParameter("title")
    //request.getParameter("director")
    //reading form data coming from request body
    var movie=req.body;
    console.log(movie);

    //creating instance of MovieEntity
    //to save it inside mongodbs
    var movieEntity=new MovieEntity();
       
    //movie data we have to copy inside movieEntity
    movieEntity.title=movie.title;
    movieEntity.director=movie.director;
    movieEntity.year=movie.year;
    movieEntity.story=movie.story;
    movieEntity.language=movie.language;
    movieEntity.poster=movie.poster;
    //setting unique id
    movieEntity.mid=uniqid();
    
    movieEntity.save(function(err){
        if(err){
            var message={status:"fail",message:err};
            res.json(message);
        }else{
            var message={status:"success",message:"Movie Record is uploaded successfully"};
            res.json(message);
        }
    });
     
});

app.get("/movies",function(req,res) {

    MovieEntity.find({},function(err,ddata){
        if(err){
            var response={status:"fail",message:err};
            res.json(response);
        }else{
            var response={status:"success",data:ddata};
            res.json(response);
        }
    });
});  


app.get("/fmovies",function(req,res) {
    var ptitle=req.query.title;
    MovieEntity.find({title:ptitle},function(err,movies){
        if(err){
            var response={status:"fail",message:err};
            res.json(response);
        }else{
            //var response={status:"success",data:ddata};
            res.json(movies);
        }
    });
});  




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



