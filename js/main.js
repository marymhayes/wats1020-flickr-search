// Asynchronous Flickr Search
//
// In the end I was not able to execute the code without the solution.js.
// I've marked out my best work for each step and surrounded it with ** before
// replacing it with the working code from solution.js.
// 
// None of the modal code is mine, I could not get the images to show up without it,
// so I added it from solution.js.
//
// Allow users to click the images to see a larger version with more information.

$(document).on('ready', function(){

  // Create a function called `searchImages()`. This function will handle the
  // process of taking a user's search terms and sending them to Flickr for a
  // response.
  
  // Removed my work *var searchImages = function(){*, replaced with code from solution.js
  var searchImages = function(tags) {
  // Inside the `searchImages()` function, the following things should happen
  
  // 2. Define the location of the Flickr API.
  // Moved var flickrAPI head of searchPhotos function.
  var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  
  // Added console.log(tags); from solution.js  
  console.log(tags);
  $('#images').innerHTML = '<li class="search-throbber">Searching...</li>';
  
  // 1.   Accept a string value called `tags` as an argument. Example:
  //      `var searchPhotos = function(tags){`
  
  // Removed my attempt *var searchPhotos = function(searchText){* because no such function
  // exists in solution.js
  
  // 3.   Construct a `$.getJSON()` call where you send a request object
  //      including the tags the user submitted, and a `done()` handler
  //      that displays and refreshes the content appropriately.
  
    $.getJSON( flickrAPI, {
    tags: tags,
    tagmode: "any",
    format: "json"
    
  /* .done() handler I based on the http://api.jquery.com/jquery.getjson/ example
      *.done(function( data ) {
      $.each( data.items, function( i, item ) {
        $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
        if ( i === 99 ) {
          return false;
        }
      });
    });*
    Replaced with .done() handler from solution.js
    */
      
    }).done(function( data ) {
      $('#images').empty();
      $('h1.search-title').first()[0].innerHTML = "Search for: " + tags;
      $.each( data.items, function( i, item ) {
        var newListItem = $("<li>")
      
        var newTitle = $('<p class="image-title">').html(item.title).appendTo(newListItem);
        var newDate = $('<p class="image-date">').text(item.date_taken).appendTo(newListItem);
        var newDescription = $('<p class="image-description">').html(item.description).appendTo(newListItem);
        var newLink = $('<a>').attr('href', item.link).text('View on Flickr.').appendTo(newListItem);    
  
        var newButton = $("<button class='btn btn-sm btn-primary'>enlarge</button>").attr({
          'data-title': item.title,
          'data-toggle': "modal",
          'data-target': "#infoModal",
          'data-imgsrc': item.media.m,
          'data-description': item.description,
          'type': "button"
        }).appendTo(newListItem);
        
  // 4.   Update the display to add the images to the list with the id
  //      `#images`.
        
        newListItem.appendTo( "#images" );
        if ( i === 99 ) {
          return false;
        }
      });
    });
  };
        

   /* Marked out my work and replaced with solution.js
   // Attach an event to the search button (`button.search`) to execute the
   // search when clicked.
       
  *$( "button.search" ).on('click', function(event){*
    // When the Search button is clicked, the following should happen:
    //
    // 1.   Prevent the default event execution so the browser doesn't
    //      Example: `event.preventDefault();`
  *event.preventDefault();*
    //
    // 2.   Get the value of the 'input[name="searchText"]' and use that
    //      as the `tags` value you send to `searchImages()`.
  *var searchText = $( ":input" );*
    //
    // 3.   Execute the `searchImages()` function to fetch images for the
    //      user.
  *searchImages(searchTextInput.value);*
  */
  
  $('button.search').on('click', function(event){
    event.preventDefault();
    var searchTextInput = $(event.target.parentElement).find('input[name="searchText"]')[0];
    console.log(searchTextInput);
    searchImages(searchTextInput.value);
  });
  
  $('#infoModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var title = button.data('title'); // Extract info from data-* attributes
    var imgSrc = button.data('imgsrc');
    var imageDescription = button.data('description');

    // Update the modal's content. We'll use jQuery here.
    var modal = $(this);
    modal.find('.modal-title').html(title);
    var modalBody = modal.find('.modal-body');
    modalBody.empty();
    var modalDescription = $("<p class='image-description'>").html(imageDescription).appendTo(modalBody);
  });

});

    // STRETCH GOAL: Add a "more info" popup using the technique shown on the
    // Bootstrap Modal documentation: http://getbootstrap.com/javascript/#modals-related-target
  





