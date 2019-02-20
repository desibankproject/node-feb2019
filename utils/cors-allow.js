

module.exports=function(app){
//To allow access of this data from different domain
//Access to XMLHttpRequest at 'http://localhost:4000/v3/profiles' from origin 'http://localhost:4200' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,user-access-token");
    res.header("Access-Control-Allow-Credentials", "*");
    //res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "x-access-token");
    next();
  });
}