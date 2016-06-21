/* global ko google */

var app = app || {};

(function () {
  'use strict';
  
  /**
   * A class to represent a location point.
   */
  app.Location = function(data) {
    var self = this;
    
    self.title = ko.observable(data.title);
    self.position = ko.observable(data.position);
    
    self.mapMarker = new google.maps.Marker({
      position: {lat: data.position.lat, lng: data.position.lng},
      title: self.title(),
      map: null
    });
  };
})();
