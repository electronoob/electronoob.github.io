function handleAPILoaded() {
  getsubs();
}

function getsubs() {
  var request = gapi.client.youtube.subscriptions.list({
    mine: true,
    part: 'contentDetails,snippet,subscriberSnippet',
    maxResults: 50,
    order: 'alphabetical'
  });
  request.execute(function(response) {
    console.log(response.result);
    $.each(response.result.items, function (index, item) {
      webAddItem(item.snippet.title, item.snippet.resourceId.channelId, item.snippet.description, item.snippet.thumbnails.high.url);
    });
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
  $("body").append (html);
}
