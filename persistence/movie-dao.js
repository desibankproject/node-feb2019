
//Importing schema..
var MovieEntity=require('../odm/movie-entity');




exports.addMovie=function(movie,callbak) {
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
    
    movieEntity.save(function(err){
        callbak(err);
    });
}

exports.findMovies=function(search,callbak) {
    if(search) {
        MovieEntity.find({title:search},function(err,data){
        callbak(err,data);
    });
    }else{
        MovieEntity.find({},function(err,data){
            callbak(err,data);
    });
    }
}  


exports.deleteMovieByMid=function(pmid,callbak) {
    MovieEntity.findOneAndRemove({mid: pmid}, function(err){
        callbak(err);
    });    
}  

exports.findMovieImageByMid=function(pmid,callbak) {
    MovieEntity.findById(pmid)
    .then(movie => {
        if(movie) {
            console.log("+_+__data is coming from the database!!!!!!!!!!!!!");
            //console.log(undefined,movie);
            //res.contentType(movie.imgdata.contentType);
            //res.send(movie.imgdata.data);          
            callbak(undefined,movie);
        }
    }).catch(err => {
            callbak(err,undefined);
    }); 
}  



