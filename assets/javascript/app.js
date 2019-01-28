//giphy api app key vmrzdMg7qZDYAPFMPp4E8hnxnv2cFFge

// Initial array of topics
var topics = [];
var rating = 'pg-13';
var favorites = []; //stores ids of gifs; also in localStorage

//this function is called by the on click for a saved search button
function callSearch() {
    doSearch($(this).attr('dataid'));
}

//this function is called by callSearch (the saved search button) and the search button (saves new search then searches)
function doSearch(foodSrch) {

    var queryURL = '';
    var limit = 10; //this is a quick hack; we should really check the results we got back and only loop that many times

    //check if favorites button, else search using button clicked
    if (foodSrch === 'myfavorites') {
        if (favorites.length > 0) {
            var idList = favorites.toString();
            console.log(idList);
            queryURL = "https://api.giphy.com/v1/gifs?api_key=vmrzdMg7qZDYAPFMPp4E8hnxnv2cFFge&ids=" + idList;
            limit = favorites.length;
        }
    } else {
        queryURL = "https://api.giphy.com/v1/gifs/search?api_key=vmrzdMg7qZDYAPFMPp4E8hnxnv2cFFge&q=" + foodSrch + "&limit=" + limit + "&rating=" + rating;
    }
    // console.log(queryURL);
    //if it's okay to do the API call
    if (queryURL !== '') {
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            // console.log(response);

            //if the checkbox is checked, clear the existing gifs
            if ($('#append-cb').prop('checked')) {
                $('#food-img-div').html('');
            }

            for (var i = 0; i < limit; i++) {

                var $itemDiv = $('<div>');
                $itemDiv.attr({ class: 'itemDiv' });

                var $img = $('<img>');
                var imgUrl = response.data[i].images.fixed_height_still.url;
                // console.log(imgUrl);
                $img.attr({ class: 'img', 'img-state': 'still', src: imgUrl, 'img-still': imgUrl, 'img-animate': response.data[i].images.fixed_height.url }); //width: '200px', height: '200px'
                $itemDiv.append($img);

                var $h5 = $('<h5>');
                var imgWidth = response.data[i].images.fixed_height_still.width;
                $h5.css('width', Number(imgWidth) + 10); //10 is the margin
                $h5.text(response.data[i].title.toUpperCase());

                var $span = $('<span>');
                $span.attr({ class: '' });
                $span.text(' (' + response.data[i].rating.toUpperCase() + ')');
                $h5.append($span);

                var $a = $('<a>');
                $a.attr({ class: 'add-favorite' });
                var favicon = $('<i>');
                favicon.attr({ id: response.data[i].id, class: 'glyphicon glyphicon-heart favicon' });
              
                //check if the gif is a favorite and make red, else white
                if(favorites.indexOf(response.data[i].id) !== -1) {
                    favicon.css('color','red');
                } else {
                    favicon.css('color','white');
                }

                $a.append(favicon);
                $h5.append($a);

                $itemDiv.append($h5);

                $('#food-img-div').append($itemDiv);

            }
            $('.img').on('click', doImg);
            $('.favicon').on('click', addFavorite);
            focusSrch();
        });
    }
}

function doImg() {
    var state = $(this).attr('img-state');
    // console.log(state);
    if (state === 'still') {
        $(this).attr('src', $(this).attr('img-animate'));
        $(this).attr('img-state', 'animate');
    } else { // animate
        $(this).attr('src', $(this).attr('img-still'));
        $(this).attr('img-state', 'still');
    }
}

// Function for displaying food-btn data
function renderButtons() {

    // var farm = $('#button-farm');
    // console.log(farm);

    // Delete the content inside the button-farm div prior to adding new topics
    $('#button-farm').html('');
    // (this is necessary otherwise you will have repeat buttons)

    // Loop through the array of topics, then generate buttons for each food-btn in the array
    for (var i = 0; i < topics.length; i++) {

        var div = $('<div>');
        div.text(topics[i]);
        div.attr('dataid', topics[i]);
        div.attr({ id: 'tag-' + i, class: 'tag label label-info btn-primary' });

        var a = $('<a>');
        a.attr({ class: 'remove-link' });

        var remove = $('<i>');
        remove.attr({ tagid: i, class: 'remove glyphicon glyphicon-remove-sign glyphicon-white' });

        a.append(remove);
        div.append(a);
        $('#button-farm').append(div);

    }
    //to attach to any children
    // $(document).on('click','button-farm',doSearch);
    $('.tag').on('click', callSearch);
    $('.remove').on('click', removeSearch);
}

function removeSearch() {
    // console.log('this: '+this);
    var idx = $(this).attr('tagid');
    // console.log('remove '+idx);
    topics.splice(idx, 1);
    localStorage.setItem('topics', JSON.stringify(topics));
    // console.log(topics);
    $('#tag-' + idx).remove();
}

function addFavorite() {
    var favid = $(this).attr('id');
    var idx = favorites.indexOf(favid);
    if(idx === -1) {
        favorites.push(favid);   
        $('#'+favid).css('color','red');
    } else {
        favorites.splice(idx, 1);
        $('#'+favid).css('color','white');
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

//make the only input the one that has focus
function focusSrch() {
    $('#food-input').focus();
    $("#food-input:text:visible:first").focus();
}

// This function handles events where the add food-btn button is clicked
$("#add-food-btn").on('click', function (event) {
    // event.preventDefault() prevents submit button from trying to send a form.
    // Using a submit button instead of a regular button allows the user to hit
    // "Enter" instead of clicking the button if desired
    event.preventDefault();

    //Get the input value
    var newFood = $('#food-input').val();
    $('#food-input').val('');
    if (newFood === '') {
        // console.log('do not add blank');
        //if button is disabled then not needed; else don't add blank
    } else if (topics.indexOf(newFood) === -1) {
        // console.log(newFood);
        //Add it to the array
        topics.push(newFood);
        localStorage.setItem('topics', JSON.stringify(topics));
        // console.log(topics);
        //Render the array
        renderButtons();
        focusSrch();
        doSearch(newFood);
    } else {
        console.log('duplicate food: ' + newFood + ' do not add');
    }
});

$('#fav-btn').on('click', function () {
    localStorage.setItem('data-id', $(this).attr('data-id'));
});

//set the on click for the favorites button
$('#search-favorites').on('click', function () {
    callSearch();
});

//check if there is localStorage, and load for persistent favorites
var dataId = localStorage.getItem('data-id');
if (dataId !== null) {
    console.log(localStorage.getItem('data-id'));
}
//if localStorage exists for key=topics, get and set to topics array
//else use starter topics array
var userTopics = localStorage.getItem('topics');
if (userTopics === null) {
    topics = ["bread", "pasta", "fruit", "meat"];
    localStorage.setItem('topics', JSON.stringify(topics));
} else {
    topics = JSON.parse(userTopics);
}

//check if they have stored favorites
var userFavorites = localStorage.getItem('favorites');
if (userFavorites !== null) {
    favorites = JSON.parse(userFavorites);
} else {
    favorites.push('l0MYC0LajbaPoEADu'); //welcome gif
    //but don't store as favorite
}

//Render the initial list in topics
renderButtons();

//make the search field have focus
focusSrch();

doSearch('myfavorites');

// var txt = "";
// txt += "<p>Browser CodeName: " + navigator.appCodeName + "</p>";
// txt += "<p>Browser Name: " + navigator.appName + "</p>";
// txt += "<p>Browser Version: " + navigator.appVersion + "</p>";
// txt += "<p>Cookies Enabled: " + navigator.cookieEnabled + "</p>";
// txt += "<p>Browser Language: " + navigator.language + "</p>";
// txt += "<p>Browser Online: " + navigator.onLine + "</p>";
// txt += "<p>Platform: " + navigator.platform + "</p>";
// txt += "<p>User-agent header: " + navigator.userAgent + "</p>";