
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
    //if(movie.poster==undefined){
        movieEntity.poster="http://www.wiki-how.in/wp-content/uploads/2015/09/hero-movie-rating-review-box-office-collection-Sooraj-Pancholi-Athiya-Shetty.jpg";
   // }else{
        //movieEntity.poster=movie.poster;
   // }
    
    movieEntity.imgdata.data = movie.data;
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



exports.findMovieById=function(_mid,callbak) {
        MovieEntity.findById(_mid,function(err,data){
                 callbak(err,data);
          });
    
    
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

exports.findMovie=function(options,callback){
    const mid=options.mid;
    const object_id=options.object_id;
    const title=options.title;
    let pageNum=options.pageNum;
    let pageSize=options.pageSize;
    if(pageNum==undefined)
        pageNum=1;
    if(pageSize==undefined)
        pageSize=50;
    
    if(object_id!=undefined){
        MovieEntity.findById(object_id,(err,movie)=>{
            callback(err,movie);
        });
    }

    else if (mid!=undefined){
        MovieEntity.findOne({mid:mid},(err,movie)=>{
            callback(err,movie);
        });
    }
    else if(title!=undefined){
        options={skip:(pageNum-1)*pageSize,limit:Number(pageSize)};
        MovieEntity.find({title:title},{},options,(err,movies)=>{
            callback(err,movies);
        });
    }
    else{
        //options is important............
        //special code for pagination
        options={skip:(pageNum-1)*pageSize,limit:Number(pageSize)};
        MovieEntity.find({},{},options,(err,movies)=>{ 
            callback(err,movies);
        });
       
    }  
}  


exports.countMovies=function(callback){
    MovieEntity.countDocuments({},(err,count)=>{
        callback(err,count);
    });
}


exports.update=function(mid,movie,callback){
    console.log('updateing');
    if(mid!=undefined){
        MovieEntity.updateOne({mid:mid},{
            title:movie.title,
            imgdata:movie.imgdata,
            director:movie.director,
            year:movie.year,
            story:movie.story,
            language:movie.language,
            poster:movie.poster
        },(err)=>{
            callback(err);
        });
    }
    else{
        callback("invalid update operation");
    }
}