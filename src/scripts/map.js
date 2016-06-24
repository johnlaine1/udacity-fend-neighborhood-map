/* global google */

var app = app || {};

(function() {
  'use strict';
  
  // This one instance of the infoWindow will be used by all functions.
  // Per Google, it's best practice to only have one infoWindow open at a time.
  app.infoWindow = new google.maps.InfoWindow({});
  
  app.initMap = function() {
    var map;
    var mapCenter = {lat: 33.386463, lng: -111.805832};
    
    map = new google.maps.Map(document.getElementById('map'), {
      center: mapCenter,
      scrollwheel: false,
      zoom: 12
    });  
    
  google.maps.event.addDomListener(window, 'resize', function() {
    map.setCenter(mapCenter);
  }); 
  
  app.map = map;
  };
  
})();