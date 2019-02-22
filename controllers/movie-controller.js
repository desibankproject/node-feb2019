var MovieDao = require("../persistence/movie-dao");
//to generate unique id
var uniqid = require('uniqid');



exports.addMovie=function(req,res) {
   
    if (Object.keys(req.files).length == 0) {
        //http status code = 400 means- input is not correct
          var message={status:"fail",message:"File input is not there"};
          return res.status(400).json(message);
        //return res.status(400).send('No files were uploaded.');
      }
          // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      let posterObject = req.files.poster;
      console.log("Printing the image!!!!!!!!!!!!!");
      console.log(posterObject.data);
      var imageName=posterObject.name;
       console.log("__)@)@(@(@(@*(@*@*@*@*  fileName = "+imageName);
     //reading form data coming from request body
    var movie=req.body;
    movie.data=posterObject.data;
    movie.name=posterObject.name;
    
    console.log(movie);
   //setting unique id
   movie.mid=uniqid();
    MovieDao.addMovie(movie,function(err){
        if(err){
            const response={status:"fail",message:err};
            res.status(500).json(response);
        }else{
            const message={status:"success",message:"Movie Record is uploaded successfully"};
            return res.status(200).send(message);
        }
    });
};

exports.tfindMovies=function(req,res) {
    var search=req.query.search;
    MovieDao.findMovies(search,function(err,ddata){
            if(err){
                var response={status:"fail",message:err};
                res.json(response);
            }else{
               // var response={status:"success",data:ddata};
                res.json(ddata);
            }
        });
    
};

exports.findMovies=function(req,res) {
        var search=req.query.search;
        MovieDao.findMovies(search,function(err,ddata){
                if(err){
                    var response={status:"fail",message:err};
                    res.json(response);
                }else{
                    var response={status:"success",data:ddata};
                    res.json(response);
                }
            });
        
};




exports.findMovieById=function(req,res) {
    var mid=req.params.mid;
    MovieDao.findMovieById(mid,function(err,movie){
        if(err){
            const response={status:"fail",message:err};
            res.status(500).json(response);
        }else{
            res.send(movie);         
        }
    });
};

//
exports.findMovieImageByMid=function(req,res) {
    var mid=req.params.mid;
    MovieDao.findMovieImageByMid(mid,function(err,movie){
        if(err){
            const response={status:"fail",message:err};
            res.status(500).json(response);
        }else{
            res.contentType(movie.imgdata.contentType);
            res.send(movie.imgdata.data);         
        }
    });
};





//@PathVariable
///movies/m928282
//express.delete("/movies/:mid"
exports.deleteMovieByMid=function(req,res) {
    var mid=req.params.mid;
    console.log("nagendra = "+mid);
     if(mid==undefined){
        const response={status:"fail",message:"mid cannot be empty"};
        res.status(500).json(response);
    }
    MovieDao.deleteMovieByMid(mid,function(err){
        if(err){
            const response={status:"fail",message:err};
            res.status(500).json(response);
        }else{
            const response = {
                message: "Todo successfully deleted",
                status: "success"
            };
            return res.status(200).send(response);
        }
    });
};

