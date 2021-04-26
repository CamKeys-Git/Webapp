$(document).ready(function(){

  jQuery("time.timeago").timeago();

  // app

  var $app = $('#app');
  $app.html('');

  // title

  var $title = $('<h1 class="title">Twiddler</h1>');
  $title.appendTo($app);
  var handleTitleClick = function(event) {
    var titleType = event.target.localName === 'h1' ? 'title' : 'subtitle';
    alert('The ' + titleType + ' of this page is: ' + event.target.innerText);
  }
  $title.on('click', handleTitleClick);

  // buttons

  var $update = $('<button class="button" id="update-feed">Update Feed</button>');
  $update.appendTo($app);

  var handleButtonClick = function(event) {
    $update.text('Update Feed');
    renderFeed();
  }
  $update.on("click", handleButtonClick);

  // feed

  var $feed = $('<div id="feed"></div>');
  $feed.appendTo($app);

  // renderFeed

  var renderFeed = function(user) {
    $( ".tweet" ).remove();

    var source;
    if (typeof user === 'string') {
      source = streams.users[user];
      var index = source.length - 1;
    } else {
      source = streams.home;
      var index = source.length - 1;
    }

    while(index >= 0) {
      var tweet = source[index];

      var $tweet = $('<div class="tweet"></div>');
      var $photo = $('<img class="profile-photo">').attr("src", tweet.profilePhotoURL);
      var $user = $('<span class="username"></span>');
      var $msg = $('<p class="message"></p>');

      var $img1 = $('<i class="icon comment fas fa-comment"></i>');
      var $img2 = $('<i class="icon comment fas fa-retweet"></i>');
      var $img3 = $('<i class="icon comment fas fa-thumbs-up"></i>');
      var $img4 = $('<i class="icon comment fas fa-share"></i>');

      var $time = $('<span class="timestamp"></span>');
      $user.text('@' + tweet.user);
      $msg.text(tweet.message);
      $time.text(jQuery.timeago(tweet.created_at));

      $photo.appendTo($tweet);
      $user.appendTo($tweet);
      $msg.appendTo($tweet);
      $time.appendTo($tweet);
      $($tweet).append($img1, $img2, $img3, $img4);

      $tweet.appendTo($feed);

      index -= 1;
    }
  }

  var handleUsernameClick = function(event) {
    var name = event.currentTarget.innerText.slice(1);
    $update.text('Back');
    renderFeed(name);
  }
  renderFeed()
  $("#feed").on("click", ".username", handleUsernameClick);
});