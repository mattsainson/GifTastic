//giphy api app key vmrzdMg7qZDYAPFMPp4E8hnxnv2cFFge

// Initial array of foodBasket
var foodBasket = ["bread", "pasta", "fruit", "meat"];

function doSearch() {
    // var txt = this.text;
    // console.log('i got here');
    // console.log(event);
    //console.log(this);
    var food = $(this).text();
    //console.log(food-btn);
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=vmrzdMg7qZDYAPFMPp4E8hnxnv2cFFge&q=" + food + "&limit=10&rating=pg-13";

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        // console.log(response.Title);
        $('#food-title').text(response.data[0].title);
        $('#food-rating').text(response.data[0].rating);
        // $('#food-img-div').text(response.data[0].images['480w_still'].url);
        var img = $('<img>');
        var imgUrl = response.data[0].images['480w_still'].url;
        img.attr({src: imgUrl, width: '200px', height: '200px'});
        $('#food-img-div').append(img);
    });
}

// Function for displaying food-btn data
function renderButtons() {

    // Delete the content inside the button-farm div prior to adding new foodBasket
    $('#button-farm').html('');
    // (this is necessary otherwise you will have repeat buttons)

    // Loop through the array of foodBasket, then generate buttons for each food-btn in the array
    for (var i = 0; i < foodBasket.length; i++) {
        var button = $('<button>');
        button.text(foodBasket[i]);
        button.addClass('searchbutton');
        $('#button-farm').append(button);
    }
    //to attach to any children
    // $(document).on('click','button-farm',doSearch);
    $('.searchbutton').on('click', doSearch);
}

// This function handles events where the add food-btn button is clicked
$("#add-food").on("click", function (event) {
    // event.preventDefault() prevents submit button from trying to send a form.
    // Using a submit button instead of a regular button allows the user to hit
    // "Enter" instead of clicking the button if desired
    event.preventDefault();

    //Get the input value
    var newM = $('#food-input').val();
    console.log(newM);
    //Add it to the array
    foodBasket.push(newM);
    console.log(foodBasket);
    //Render the array
    renderButtons();
});

//Render the initial list in foodBasket
renderButtons();