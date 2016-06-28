/* global google ko */

var app = app || {};

(function() {
  'use strict';
  // This one instance of the infoWindow will be used by all functions.
  // Per Google, it's best practice to only have one infoWindow open at a time.

  app.initMap = function() {
    // We wrap the contents of this function in an if statement to see if the
    // google script (which is loading async defer) has loaded yet. In order
    // to avoid errors, we need this function to be available, but the contents
    // or more precisely, the calls to 'google' not to be called until we know
    // that the 'google' script has finished loading.
    if (typeof google !== 'undefined') { 
      var mapCenter = new google.maps.LatLng(33.386463, -111.805832);
      var mapZoom = 10;
      
      // We will share one infoWindow amoung all markers.
      app.infoWindow = new google.maps.InfoWindow({});
      
      app.map = new google.maps.Map(document.getElementById('map'), {
        center: mapCenter,
        scrollwheel: false,
        zoom: mapZoom
      });  
      
      google.maps.event.addDomListener(window, 'resize', function() {
        app.map.setCenter(mapCenter);
      }); 
      
      ko.applyBindings(new app.MapViewModel());
    }
  };
  
  app.googleError = function() {
    console.log('There has been an error');
    document.getElementById('page-content').innerHTML = '<h1>Sorry, Google Maps has failed to load.</h1>';
  };
  
})();