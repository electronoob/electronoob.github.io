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
      console.log(item.snippet.title);
    });
  });
}
