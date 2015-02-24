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
<div style='width: 300px; float: left; border: 2px solid #c0c0c0; padding: 20px; margin: 20px;'>\
    <img style='width: 30px; height: 30px;' src='"+img+"'/><br/>\
    <a href='https://www.youtube.com/channel/"+id+"'><span>"+title+"</span></a>\
    <p>"+description+"</p>\
    <div id='"+id+"' class='uploads'>fetching uploads playlist</div>\
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
/*no cors for vlc unfortunately.
    $( "#stv"+plsId ).bind( "click", function() {
        event.preventDefault();
        $.ajax({
            url: $(this).attr('href')
            ,success: function(response) {
                $( "#stv"+plsId ).empty();
                $( "#stv"+plsId ).append("sent to vlc");
            }
        })
        return false;
    });
*/









  })
  .fail(function(response) {
    $("#"+id).empty();
    $("#"+id).append("Some dumb error occured when trying to get upload playlist.<br><pre>"+response+"</pre>");
  })

}

function prevPage() {
//    $("#output").empty();
    getsubs(prevPageToken);
}

