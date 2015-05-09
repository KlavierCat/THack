/*
function getCities(searchTxt, callback) {
  var sSkSetCityUrl = "http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/GB/GBP/en-GB?query="+ searchTxt +"&apiKey=ilw17461763557121979175293897360";
  strReturn = "";
  jQuery.getJSON({
    url: sSkSetCityUrl,
    dataType: 'JSONP',
    jsonpCallback: 'callback',
    success: callback
  });

  return strReturn;
}
*/
function initialize() {

  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));


  var autocomplete = new google.maps.places.Autocomplete(input);

  var infowindow = new google.maps.InfoWindow();

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    infowindow.close();
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    //infowindow.open(map, marker);
    lat = place.geometry.location.A;
    lon = place.geometry.location.F;
    //gets places nearby
    var pyrmont = new google.maps.LatLng(lat, lon);

    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: pyrmont,
      zoom: 15
    });

    var request = {
      location: pyrmont,
      radius: 500,
      types: ['amusement_park' , 'aquarium' , 'art_gallery']
    };
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  });
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    $("#placesToVisit").html("");
    for (var i = 0; i < results.length; i++) {
      //console.log(results[i])

      $("#placesToVisit").append('<input type="checkbox" id="place' + i + '" >'+results[i].name+'</input><br />');
      results[i].name
    }
  }
}


$(function() {
  initialize();
});
