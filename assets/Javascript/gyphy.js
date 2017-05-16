// user experience
// ====================================================
// user clicks on button to see a list of still images from the topic listed on the button.
// user can click on the gif to activate the gif animation.
// user can enter a new movie name in the text field and submit the topic to add a new button and see an image of that movie.
// user can click on the new gif topic to activate the gif animation.
//

// code requirements
// ====================================================
// display a series of button that that correspod to the topic array.
// create a .AJAX call to the gyphy api url
// on.click loads a set amount of still images through the use of the gyphy api response.
// on.click activates still images to an animated gif state
// create a form field to except new topic entries with a submit button
// append a new button for the new topic submitted
// new entry behavior matches existing entries.





//-----------------------------------------------
//----------  ** Global Variables ** ------------
//-----------------------------------------------
var topics = ["napoleon dynomite", "ace ventura", "anchorman", "star wars", "the matrix", "waynes world"];



//-----------------------------------------------
//----------  ** Global Functions ** ------------
//----------------------------------------------- 

$(document).ready(function() {
	console.log("here");
    for (var i = 0; i < topics.length; i++) {
    	console.log('i ' + i);
    	console.log(topics[i]);
        $("#gyphy-btn").append('<button type="button">' + topics[i] + '</button>');
		}






            // $("button").on("click", function() {
            //     var topics = $(this).attr("data-movie");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
    topics + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
    url: queryURL,
    method: "GET"
    }).done(function(response) {
    console.log(response);
});
            //         var results = response.data;

            //         for (var i = 0; i < results.length; i++) {
            //             var movieDiv = $('<div class="">');
            //             var ratingText = $('<p>').text("Rating: " + results[i].rating);
            //             var movieImage = $('<img>');

            //             movieImage.attr("src", results[i].images.fixed_height.url);

            //             movieDiv.append(ratingText);
            //             movieDiv.append(movieImage);

            //             $('#gifs-appear-here').prepend(movieDiv);
            //         }
            //     });

            });