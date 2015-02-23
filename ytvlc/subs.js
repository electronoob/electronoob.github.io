function handleAPILoaded() {
  getsubs();
}

function getsubs() {
  var request = gapi.client.youtube.subscriptions.list({
    mine: true,
    part: 'subscriberSnippet'
  });
  request.execute(function(response) {
    console.log(response.result);
  });
}
