/* global ko google */
var app = app || {};

(function() {
  'use strict';
  
  app.MapViewModel = function() {
    var self = this;
    
    self.locationList = ko.observableArray([]);
    
    // Populate the locationList array with initial data.
    app.locationData.forEach(function(loc) {
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

    // We need to re-render the markers each time the filteredLocations
    // property changes.
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
      console.log(self.filteredLocations());
      self.filteredLocations().forEach(function(loc) {
        loc.mapMarker.setMap(app.map);
      });
    };

    self.showMarkerInfoWindow = function(location) {
      console.log(location);
      location.getData()
        .done(location.getDataSuccess())
        .fail(location.getDataFail());
    };

    window.addEventListener('load', function() {
      app.initMap();
      self.renderMapMarkers();
    });

  };  
})();