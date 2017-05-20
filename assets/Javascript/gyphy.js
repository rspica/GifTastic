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

var movieTitle = $("#movieTitle").val().trim();

//-------------------------------------------------------
//----------------  **Audio Elements**  ------------------
//-------------------------------------------------------
var clickAudio = new Audio('./assets/sound/jump2.mp3');


//-----------------------------------------------
//----------  ** Global Functions ** ------------
//----------------------------------------------- 

$(document).ready(function() {
    for (var i = 0; i < topics.length; i++) {
        movieBtn(topics[i]);
    }


    $(document.body).on("keyup", "#movieTitle", function(e) {
        event.preventDefault();
        if ((e.type === 'keyup') && (e.keyCode === 13)) {
            userSubmit();
        }
    });



    $(document.body).on("click", "#submit-btn", function(e) {
        event.preventDefault();
        clickAudio.play(clickAudio);
        userSubmit();
        $("#movieTitle").val("");
    });

    function userSubmit() {
        var movieTitle = $("#movieTitle").val().trim();
        $("#gifContainer").empty();
        console.log('movie entered line 65: ' + movieTitle)
        topics.push(movieTitle);
        //       movieBtn(movieTitle);
        //       gifPull(movieTitle);
        movieDupeCheck(movieTitle);
    }

    $("#giphy-btn").on("click", ".button", function() {
        clickAudio.play(clickAudio);
        $("#gifContainer").empty();
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
            // console.log(response);
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifContainer = $('<div class="gifImage">');
                var ratingText = $('<p>').text("rating: " + results[i].rating);
                var gifImage = $('<img>');
                gifImage.attr({
                    "src": results[i].images.fixed_height_still.url,
                    "data-static": results[i].images.fixed_height_still.url,
                    "data-motion": results[i].images.fixed_height.url,
                    "data-state": "static",
                    "class": "image",
                });
                gifContainer.append(ratingText);
                gifContainer.append(gifImage);
                $("#gifContainer").prepend(gifContainer);
            }
        });
    }

    // on click activation for gif animation / still image
    $(document.body).on("mouseenter mouseleave", ".image", function() {
        console.log('here');
        var state = $(this).attr('data-state');
        //       console.log('here: ' + state);
        if (state === "static") {
            $(this).attr("src", $(this).attr("data-motion"));
            $(this).attr("data-state", "animate");

        } else {
            $(this).attr("src", $(this).attr("data-static"));
            $(this).attr("data-state", "static");
        }
    });


    // subjects button maker
    function movieBtn(title) {
        $("#giphy-btn").append('<button class="button btn-right btn-style" data-movie="' + title + '">' + title + '</button>');
    }



    // duplicate gif pull / button maker check
    function movieDupeCheck(movieTitle) {
        var counter = 1;
        for (var i = 0; i < topics.length; i++) {
            console.log("tlength:" + topics.length)

            console.log('i: ' + i);
            console.log("topics: " + topics[i]);
            console.log("movieTitle: " + movieTitle);

            if (movieTitle == topics[i]) {
                console.log('this ' + movieTitle + ' was already entered!');
                continue;
            }
            if (movieTitle != topics[i]) {
                counter++;
                console.log("counter: " + counter);
            }
            if (counter == topics.length) {
                console.log("creating a new button");
                topics.push(movieTitle);
                movieBtn(movieTitle);
                gifPull(movieTitle);
            } else if (counter == topics.length-1) {
                console.log("That's a repeat bro");
            }
        }
    }

});
