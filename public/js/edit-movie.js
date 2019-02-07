function updateMovie(){
  		var formdata=new FormData(document.getElementById('movieEditForm'));
		//send formdata using AJAX to the server
		//fetching mid from open popup
		var emid=$("#mid").val();
		fetch('editMovieServlet', {
			method: 'post',
			body: formdata
		}).then(function(response) {
		    return response.text();
		  }).then(function(text) { 
		  	console.log(text); 
		  	var spanObj=document.getElementById("errorMessage");
			spanObj.innerHTML=text;
			//update table at gui
			$("#dtitle"+emid).html($("#etitle").val());
			$("#ddirector"+emid).html($("#edirector").val());
			$("#dyear"+emid).html($("#eyear").val());
			$("#dlanguage"+emid).html($("#elanguage").val());
			$("#dstory"+emid).html($("#ereview").val());
			$("#movieEditFormModel").modal("hide");
			//This is used to clear form data using JavaScript
			//document.movieEditFormModel.reset();
			//closing the poup
			
			//clearing the form data using javascript
		  });

  	}

  	function openEditPopup(mid){
		//document.getElementById("movieEditFormModel").modal("show");
		var title=$("#dtitle"+mid).html();
		if(title.trim().length==0){
			document.getElementById("errorMessage").innerHTML="Sorry!, no search result exists!!!!!!";
			document.searchMovieForm.title.focus();
			return;
		}
		$("#mid").val(mid);
		$("#etitle").val(title);

		var director=$("#ddirector"+mid).html();
		$("#edirector").val(director);

		var year=$("#dyear"+mid).html();
		$("#eyear").val(year);

		var language=$("#dlanguage"+mid).html();
		$("#elanguage").val(language);

		var story=$("#dstory"+mid).html();
		$("#ereview").val(story);
		
		$("#movieEditFormModel").modal("show");
  	}

	function clearMessage(){
		document.getElementById("errorMessage").innerHTML="";
	}	