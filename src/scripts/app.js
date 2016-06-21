/* global ko */

var app = app || {};

(function () {
  'use strict';

  // Data used to create the locations.
  app.locationData = [
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

  ko.applyBindings(new app.MapViewModel(app.locationData));  

})();








