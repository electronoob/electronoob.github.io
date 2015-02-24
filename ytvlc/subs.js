var nextPageToken = '';
var prevPageToken = '';
var currentPageNumber = '';

function handleAPILoaded() {
   getsubs();
   while(nextPage()) {}
   alert("generated list of all of your subs");    
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
          webAddItem(item.snippet.title, item.snippet.resourceId.channelId, item.snippet.description, item.snippet.thumbnails.default.url);
        });
    } else {
        webAddItem('cant find shit dawg', -1, "unable to load content", null);
    }
  });
}

function webAddItem (title, id, description, img) {
  html = "\
<div style='border: 2px solid #c0c0c0; padding: 20px; margin: 20px;'>\
    <img style='width: 30px; height: 30px;' src='"+img+"'/><br/>\
    <a href='https://www.youtube.com/channel/"+id+"'><span>"+title+"</span></a>\
    <p>"+description+"</p>\
</div>\
";
  $("#output").append (html);
}

function nextPage() {
//    $("#output").empty();
    if (nextPageToken) {
        getsubs(nextPageToken);
        return 1;
    }    else {
        return 0; 
    }
}
function prevPage() {
//    $("#output").empty();
    getsubs(prevPageToken);
}

