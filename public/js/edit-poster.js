function openUpdatePoster(mid){
		if($("#dtitle"+mid).text().trim().length==0){
			$("#errorMessage").html("Please find the movie before updating poster!")
			return;
		}
		//mid we are setting inside the image upload popup
		$("#imagemid").val(mid);
		$("#imgtEditFormModel").modal("show");
	}
		
	function updatePoster(){
		//document.getElementById('imgtEditForm').mid.value=$("#mid").val();
		//Accessing mid from the popup form
		var mid=$("#imagemid").val();
		var formdata=new FormData(document.getElementById('imgtEditForm'));
		//upload form with image and movieID
		//default use multipart, so @multipart on servlet
			fetch("posterServlet",{
				method: 'post',
				body: formdata
			})
			.then(function(response) {
			  return response.blob();
			})
			.then(function(imageBlob) {
				console.log(imageBlob);
				//update poster img on search result
				var objectURL = URL.createObjectURL(imageBlob);
				$("#timage"+mid).attr("src",objectURL);
			});
		
			$("#imgtEditFormModel").modal("hide");
	}