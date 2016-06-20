/**
 * Neighborhood Map
 */
'use strict';

var locations = [
  {
  title: 'one', 
  position: {lat: 33.4246989, lng: -111.694253}
  },
  {
  title: 'two', 
  position: {lat: 33.425541, lng: -111.696109}
  },
  {
  title: 'three', 
  position: {lat: 33.424804, lng: -111.696090}
  },
  {
  title: 'four', 
  position: {lat: 33.424594, lng: -111.697066}
  },
  {
  title: 'five', 
  position: {lat: 33.424831, lng: -111.698879}
  }
  ];



function initMap() {
  var mapCenterStart = {lat: 33.4246989, lng: -111.694253};
  
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: mapCenterStart,
    scrollwheel: false,
    zoom: 15
  });
  
  // Create a marker and set its position.
  locations.forEach(function(loc) {
    new google.maps.Marker({
    map: map,
    position: loc.position,
    title: loc.title
  });  
  });
}

window.addEventListener('load', initMap);






