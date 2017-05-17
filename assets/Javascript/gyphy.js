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
    for (var i = 0; i < topics.length; i++) {
        movieBtn(topics[i]);
    }


    $(document.body).on("click keyup", "#submit-btn", function(e) {
        event.preventDefault();
        if ((e.type == 'keyup') && (e.keyCode == 13) && $(e.target).is('input')) return;
        userSubmit();
    });



    function userSubmit() {
        var movieTitle = $("#movieTitle").val().trim();
        topics.push(movieTitle);
        movieBtn(movieTitle);
        gifPull(movieTitle);
        //   	movieDupeCheck(movieTitle);
    }

    $("#gyphy-btn").on("click", ".button", function() {
        var movie = $(this).attr("data-movie");
        console.log("this: " + this);
        gifPull(movie);
    });


    function gifPull(subject) {
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
            subject + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifContainer = $('<div class="gifImage">');
                var ratingText = $('<p>').text("Rating: " + results[i].rating);
                var gifImage = $('<img>');

                gifImage.attr("src", results[i].images.fixed_height.url);
                gifContainer.append(ratingText);
                gifContainer.append(gifImage);
                $("#gifContainer").prepend(gifContainer);
            }
        });
    }


    // button maker
    function movieBtn(movieTitle) {
        $("#gyphy-btn").append('<button class="button" data-movie="' + movieTitle + '">' + movieTitle + '</button>');
    }

    // duplicate gif pull / button maker check
    function movieDupeCheck(movieTitle) {
        for (var i = 0; i < topics.length; i++) {
            console.log("top: " + topics);
            console.log('i: ' + i);
            if (movieTitle === topics) {
                console.log('matched');
                break;
            } else if (movieTitle !== topics) {
                movieBtn(movieTitle);
            }
        }
    }
});
