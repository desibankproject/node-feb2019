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
    //poster we are just saving image name
    movieEntity.poster=imageName;

    movieEntity.imgdata.data = posterObject.data;
    movieEntity.imgdata.contentType = 'image/png';

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


app.get('/image-loader', function (req, res, next) {
    var _id=req.query.mid;
     console.log("nagendra = "+_id);
     if(_id==undefined){
         return;
     }
      console.log("____Accessing the rowdi  _id = "+_id);

      MovieEntity.findById(_id)
         .then(movie => {
             if(movie) {
                 console.log("+_+__data is coming from the database!!!!!!!!!!!!!");
                 console.log(movie);
                 res.contentType(movie.imgdata.contentType);
                 res.send(movie.imgdata.data);          
             }
         }).catch(err => {
             if(err.kind === 'ObjectId') {
                 return res.status(500).send({});                
             }
             return res.status(500).send({ });
         });
});

app.get('/delete-movie', function (req, res, next) {
    var mid=req.query.mid;
     console.log("nagendra = "+mid);
     if(mid==undefined){
         return;
     }
      console.log("____Accessing the rowdi  mid = "+mid);
      MovieEntity.findOneAndRemove({mid: mid}, function(err){
        if(err){
            var response={status:"fail",message:err};
            res.status(500).json(response);
        }else{
            const response = {
                message: "Todo successfully deleted",
                status: "success"
            };
            return res.status(200).send(response);
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
