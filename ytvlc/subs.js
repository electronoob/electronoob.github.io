var nextPageToken = '';
var prevPageToken = '';
var currentPageNumber = '';

function handleAPILoaded() {
  getsubs(null);
}

function getsubs(pageToken) {
  var requestOptions = {
    mine: true,
    part: 'contentDetails,snippet',
    maxResults: 50,
    order: 'alphabetical'
  };
  if(pageToken) {
    requestOptions.pageToken = pageToken;
  }
  var request = gapi.client.youtube.subscriptions.list(requestOptions);
  request.execute(function(response) {
    console.log(response.result);
    if (response.result.kind == "youtube#subscriptionListResponse") {
        nextPageToken = response.result.nextPageToken;
        prevPageToken = response.result.prevPageToken;
        $.each(response.result.items, function (index, item) {
          webAddItem(item.snippet.title, item.snippet.resourceId.channelId, item.snippet.description, item.snippet.thumbnails.default.url, item.snippet.relatedPlaylists.uploads);
        });
    } else {
        webAddItem('cant find shit dawg', -1, "unable to load content", null);
    }
  });
}

function webAddItem (title, id, description, img, uploads) {
  html = "\
<div style='width: 400px; border: 2px solid #c0c0c0; padding: 20px; margin: 20px;'>\
    <img style='width: 30px; height: 30px;' src='"+img+"'/><br/>\
    <a href='https://www.youtube.com/channel/"+id+"'><span>"+title+"</span></a>\
    <h2>"+uploads+"</h2>\
    <p>"+description+"</p>\
</div>\
";
  $("#output").append (html);
}

function nextPage() {
    $("#output").empty();
    getsubs(nextPageToken);
}
function prevPage() {
    $("#output").empty();
    getsubs(prevPageToken);
}

