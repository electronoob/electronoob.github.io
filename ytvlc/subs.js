function handleAPILoaded() {
  getsubs();
}

function getsubs() {
  var request = gapi.client.youtube.subscriptions.list({
    mine: true,
    part: 'contentDetails'
  });
  request.execute(function(response) {
    console.log(response.result);
  });
}
