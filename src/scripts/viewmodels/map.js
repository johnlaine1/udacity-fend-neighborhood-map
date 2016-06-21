/* global ko */
var app = app || {};

(function() {
  'use strict';
  
  app.MapViewModel = function(locations) {
    var self = this;
    var map;
    var mapCenterStart = {lat: 33.4246989, lng: -111.694253};
    
    self.locationList = ko.observableArray([]);
    
    // Populate the locationList array with initial data.
    locations.forEach(function(loc) {
      self.locationList.push(new app.Location(loc));
    });
    
    // Grab the search value entered by the user
    self.searchInput = ko.observable("");
    
    self.filteredLocations = ko.computed(function() {
      var filter = self.searchInput().toLowerCase();
      var title;
      
      // If there is no filter value, return original array
      if (!filter) {
        return self.locationList();
      } else {
          return self.locationList().filter(function(location) {
            title = location.title().toLowerCase();
            
              for (var i = 0, len = filter.length; i < len; i++) {
                if (!title.includes(filter[i])) { return false; } 
              }
              return true;

          });
      }
    });

    self.searchInput.subscribe(function(newVal) {
      self.renderMapMarkers();
    });
    
    // Clear all existing markers from the map.
    self.clearAllMarkers = function() {
      self.locationList().forEach(function(loc) {
        loc.mapMarker.setMap(null);
      });
    };
    
    self.renderMapMarkers = function() {
      // Clear all existing markers first.
      self.clearAllMarkers();
      self.filteredLocations().forEach(function(loc) {
        loc.mapMarker.setMap(map);
      });
    };

    self.initMap = function() {
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
      center: mapCenterStart,
      scrollwheel: false,
      zoom: 15
    });
    
    self.renderMapMarkers();
  };
  window.addEventListener('load', self.initMap);  
  }  
})();