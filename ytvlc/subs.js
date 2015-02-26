var nextPageToken = '';
var prevPageToken = '';
var currentPageNumber = '';
var apikey = 'AIzaSyCqh_vJ8HvSgFxmwkW4jN-eaq_SlO8n0mI';

function handleAPILoaded() {
   getsubs();
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
        if (response.result.nextPageToken)
            getsubs(response.result.nextPageToken); 
    } else {
        webAddItem('cant find shit dawg', -1, "unable to load content", null);
    }
  });
}

function webAddItem (title, id, description, img) {
  html = "\
<div class='webItemDiv'>\
    <a class='webItemName' href='https://www.youtube.com/channel/"+id+"'><span class='webItemSpan'>"+title+"</span></a>\
        <div class='webItemChunk'>\
            <img class='webItemImg' src='"+img+"'/>\
            <p class='webItemDescription'>"+description+"</p>\
            <div id='"+id+"' class='webItemUploads'>fetching uploads playlist</div>\
        </div>\
</div>\
";
  $("#output").append (html);
var jqxhr = $.get( "https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id="+id+"&maxResults=50&key="+apikey)
  .done(function(response) {
    $("#"+id).empty();
    plsId = response.items[0].contentDetails.relatedPlaylists.uploads;
    pls = "https://www.youtube.com/playlist?list="+plsId;
    $("#"+id).append(
        "<a target='_blank' href='"+pls+"'>"
        + "Channel uploads playlist"
        + "</a>"
        + "<br/>"
        + "<a class='sendToVLCpls' id='stv"+plsId+"' target='hiddentarget' href='http://localhost:8080/requests/status.json?command=in_enqueue&input="+encodeURIComponent(pls)+"'>"
        + "Send to VLC (localhost:8080)"
        + "</a>"        
    );
  })
  .fail(function(response) {
    $("#"+id).empty();
    $("#"+id).append("Some dumb error occured when trying to get upload playlist.<br><pre>"+response+"</pre>");
  })

}
