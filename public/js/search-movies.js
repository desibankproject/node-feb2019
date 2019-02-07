function searchMovie(){
		//alert("@)@@(@(@()))");
		var titlev=document.searchMovieForm.title.value;
		if(titlev.length==0){
			var spanObj=document.getElementById("errorMessage");
			spanObj.innerHTML="Sorry! title cannot be blank.............";
			document.searchMovieForm.title.focus();
			return;
		}else{
			//load data using AJAX
			fetch('searchMovies?title='+titlev).then(function(response) { 
				// Convert to JSON
				return response.json();
			}).then(function(movies) {
				// Yay, `j` is a JavaScript object
				console.log(movies); 
				var dynamicContents="";
				movies.forEach( item => {
	                  	console.log(item);   
	                  	dynamicContents=dynamicContents+'<table class="table table-bordered">';
	                  	dynamicContents=dynamicContents+'<tr>';
	                  	dynamicContents=dynamicContents+'<td>';
	                  	dynamicContents=dynamicContents+'<table class="table table-bordered">';
	                  	dynamicContents=dynamicContents+'<tbody>';
	                  	dynamicContents=dynamicContents+'<tr>';
	                  	dynamicContents=dynamicContents+'<td>Title</td>';
	                  	dynamicContents=dynamicContents+'<td id="dtitle'+item.mid+'">';
	                  	dynamicContents=dynamicContents+item.title;
	                  	dynamicContents=dynamicContents+'</td>';
	                  	dynamicContents=dynamicContents+'</tr>';
	                  	dynamicContents=dynamicContents+'<tr>';
	                  	dynamicContents=dynamicContents+'<td>Director</td>';
	                  	dynamicContents=dynamicContents+'<td id="ddirector'+item.mid+'">';
	                	dynamicContents=dynamicContents+item.director;
	                	dynamicContents=dynamicContents+'</td>';
	                  	dynamicContents=dynamicContents+'</tr>';
	                  	dynamicContents=dynamicContents+'  <tr>';
	                  	dynamicContents=dynamicContents+'<td>Year</td>';
	                  	dynamicContents=dynamicContents+'<td id="dyear'+item.mid+'">';
	                  	dynamicContents=dynamicContents+item.year;
	                	dynamicContents=dynamicContents+'</td>';
	                  	
	                  	dynamicContents=dynamicContents+'</tr>';
	                  	dynamicContents=dynamicContents+'<tr>';
	                  	dynamicContents=dynamicContents+'<td>Language</td>';
	                  	dynamicContents=dynamicContents+'<td id="dlanguage'+item.mid+'">';
	                  	dynamicContents=dynamicContents+item.language;
	                	dynamicContents=dynamicContents+'</td>';
	                  	
	                  	dynamicContents=dynamicContents+'</tr>';
	                  	dynamicContents=dynamicContents+'<tr>';
	                  	dynamicContents=dynamicContents+'<td>Review</td>';
	                  	dynamicContents=dynamicContents+'<td id="dstory'+item.mid+'">';
	                  	dynamicContents=dynamicContents+item.story;
	                	dynamicContents=dynamicContents+'</td>';
	                  	dynamicContents=dynamicContents+'</tr>';
	                  	dynamicContents=dynamicContents+'</tbody>';
	                  	dynamicContents=dynamicContents+' </table>';
	                  	dynamicContents=dynamicContents+'</td>';
	                  	dynamicContents=dynamicContents+'<td style="width: 30%;">';
	                    dynamicContents=dynamicContents+'<table class="table table-borderless">';
	                	dynamicContents=dynamicContents+'<tbody>';
	                    dynamicContents=dynamicContents+'<tr>';
	                	dynamicContents=dynamicContents+'<td>';
	                	var imageURL="posterServlet?mid="+item.mid;
	                	dynamicContents=dynamicContents+'<img id="timage'+item.mid+'" src="'+imageURL+'" style="height: 200px;" class="img-thumbnail" >';
	                	dynamicContents=dynamicContents+'<a href="javascript:openUpdatePoster('+item.mid+');"> <img id="cimage" src="img/change-image.png"  class="img-thumbnail" ></a>';
	                	dynamicContents=dynamicContents+' <a href="javascript:openEditPopup('+item.mid+');"> <img id="etimage" src="img/edit.png" style="height: 60px;" class="img-thumbnail" ></a>';
	                        
		                dynamicContents=dynamicContents+'</td>';
	           			dynamicContents=dynamicContents+'</tr>';
	           			dynamicContents=dynamicContents+'</tbody>';
	           			dynamicContents=dynamicContents+'</table>';
	           			dynamicContents=dynamicContents+'</td>';
	           			dynamicContents=dynamicContents+'</tr>';
	               		dynamicContents=dynamicContents+'</table>';
	
	    		});

	    		$("#searchResults").html(dynamicContents);
				
			});
			

			
			
		}
	}