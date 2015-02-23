var nextPageToken = '';
var prevPageToken = '';
var currentPageNumber = '';

function handleAPILoaded() {
  getsubs(null);
}

function getsubs(pageToken) {
  var requestOptions = {
    mine: true,
    part: 'contentDetails,snippet,subscriberSnippet',
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
          webAddItem(item.snippet.title, item.snippet.resourceId.channelId, item.snippet.description, item.snippet.thumbnails.high.url);
        });
    } else {
        webAddItem('cant find shit dawg', -1, "unable to load content", null);
    }
  });
}

function webAddItem (title, id, description, img) {
  html = "\
<div style='width: 400px; border: 2px solid #c0c0c0; padding: 20px;'>\
    <span>"+title+"</span>\
    <a href='https://www.youtube.com/channel/"+id+"'>"+description+"</a>\
    <img src='"+img+"'/>\
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

