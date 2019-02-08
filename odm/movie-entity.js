/**
 *  This fill will make a
 *  connection to the database
 *  This file is known as module
 */
//creating mongoose to define schema
//This mongoose is ORM for 
var mongoose = require('mongoose');
var MovieSchema  = new mongoose.Schema({
    mid: { type: String,required: true, unique: true },
    title: { type: String},
    director: { type: String},
    year: { type: String},
    story: { type: String},
    poster: { type: String},
    language: { type: String},
    doe: {type: Date},
    dom: {type: Date},
    },{collection: 'movies_data'});

            //on every save, add the date
MovieSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.dom = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.doe){
      this.doe = currentDate;
    } 
    next(); //means go ahead and save it into db now
});

//Here we are registering MovieSchema as model in mongoose
var MovieEntity=mongoose.model('movies_data', MovieSchema);
//exporting object ProfileEntity
module.exports=MovieEntity;

