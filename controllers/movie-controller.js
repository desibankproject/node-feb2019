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
    MovieDao.addMovie(movie,function(err,data){
        if(err){
            const response={status:"fail",message:err};
            res.status(500).json(response);
        }else{
            console.log("data");
           // console.log(data);
            const message={status:"success",message:"Movie Record is uploaded successfully",_id:data._id};
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


exports.getMovies=function(req,res){
    let mid=req.params.mid;
    let title=req.query.search;
    //add object_id
    let pageNum=req.query.pageNum;
    let pageSize=req.query.pageSize;
    let options={mid:mid,title:title,pageNum:pageNum,pageSize:pageSize};
    //check invalid page num and page size
    if((pageNum!=undefined&&pageNum<1)||(pageSize!=undefined&&pageSize<1)){
        var response={status:404,message:"invalid page number or page size"};
        res.status(404).json(response);
    }

    if(mid!=undefined){
        MovieDao.findMovie(options,(err,movie)=>{
            if(err){
                var response={status:404,message:err};
                res.status(404).json(response);
            }else{
                var response={status:200,data:movie};
                res.status(200).json(response);
            }
            return;
        });
       
    }else if(title!=undefined){
        MovieDao.findMovie(options,(err,movies)=>{
            if(err){
                var response={status:404,message:err};
                res.status(404).json(response);
            }else{
                var response={status:200,data:movies};
                res.status(200).json(response);
            }
        });

    }else{
        //if no info given, get all movies
        MovieDao.findMovie(options,(err,movies)=>{
            if(err){
                var response={status:404,message:err};
                res.status(404).json(response);
            }else{
                //find total number of movies
                MovieDao.countMovies((err,count)=>{
                    if(err){
                        var response={status:404,message:err};
                        res.status(404).json(response);
                        return;
                    }else{
                    var response={status:200,data:movies,totalMoviesNumber:count};
                    res.status(200).json(response);
                    }
                });
            }
        });
    }
}





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

exports.updateMovie=function(req,res){
    //console.log('inside update controller');
    if (Object.keys(req.files).length == 0) {
        //http status code = 400 means- input is not correct
          var message={status:"fail",message:"File input is not there"};
          return res.status(400).json(message);
        //return res.status(400).send('No files were uploaded.');
      }
    
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      let posterObject = req.files.poster;
      var imageName=posterObject.name;
   
    //reading form data coming from request body
    var movie=req.body;
    //creating instance of MovieEntity
    //to save it inside mongodbs
    var movieEntity=new MovieEntity();
    //movie data we have to copy inside movieEntity
    movieEntity.title=movie.title;
    movieEntity.director=movie.director;
    movieEntity.year=movie.year;
    movieEntity.story=movie.story;
    movieEntity.language=movie.language;
    //poster we are just saving image name
    movieEntity.poster=imageName;
    movieEntity.imgdata.data = posterObject.data;
    movieEntity.imgdata.contentType = 'image/png';
    //setting unique id
    movieEntity.mid=movie.mid;
    MovieDao.update(movieEntity.mid,movieEntity,function(err){
        if(err){
            var message={status:"fail",message:err};
            res.json(message);
        }else{
            var message={status:"success",message:"Movie Record is uploaded successfully"};
            res.json(message);
        }
    });
}

