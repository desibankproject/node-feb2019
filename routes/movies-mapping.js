
var MovieController = require("../controllers/movie-controller");
//below is function expression where we are passing e
//instance of express framework as a parameter
module.exports=function(express){
    express.get("/movies",MovieController.findMovies);
    express.get("/movies/:mid",MovieController.findMovieById);
    express.get("/tmovies",MovieController.tfindMovies);
	express.post("/movies",MovieController.addMovie);
	//app.put("/movies",MovieController.updateMovie);
    express.delete("/movies/:mid",MovieController.deleteMovieByMid);
    express.get("/movies/images/:mid",MovieController.findMovieImageByMid);
   // express.get("/movies",MovieController.findMovieByTitle);
};