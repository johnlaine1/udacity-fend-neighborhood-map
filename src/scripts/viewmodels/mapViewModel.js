/* global ko */
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
    
    // Grab the search value entered by the user.
    self.searchInput = ko.observable("");
    
    // Get the search type entered by the user, default is exact.
    self.searchType = ko.observable('exact');
    
    // Returns an array of locations filtered by the search input.
    self.filteredLocations = ko.computed(function() {
      var filter = self.searchInput().toLowerCase();
      var title;
      
      // If there is no filter value, return original array
      if (!filter) {
        return self.locationList();
      } else {
          return self.locationList().filter(function(location) {
            title = location.title().toLowerCase();
              
              // We use the searchType variable to check if the user wants the
              // results to only "contain" the string the enter or for the 
              // results to match the string "exactly"
              for (var i = 0, len = filter.length; i < len; i++) {
                if (self.searchType() === 'contains') {
                  if (!title.includes(filter[i])) { return false; } 
                } else 
                if (self.searchType() === 'exact') {
                  if (title[i] !== filter[i]) { return false; } 
                }
              }
              return true;

          });
      }
    });

    // We need to re-render the markers each time the filteredLocations
    // property changes. This will update the map as the user enters a value
    // into the search box.
    self.filteredLocations.subscribe(function(newVal) {
      self.renderMapMarkers();
    });
    
    // Clear all existing markers from the map.
    self.clearAllMarkers = function() {
      self.locationList().forEach(function(loc) {
        loc.mapMarker.setMap(null);
      });
    };
    
    // Render all map markers attached to location objects in the filteredLocations
    // array.
    self.renderMapMarkers = function() {
      // Clear all existing markers first.
      self.clearAllMarkers();
      self.filteredLocations().forEach(function(loc) {
        loc.mapMarker.setMap(app.map);
      });
    };

    // Show the infoWindow for the passed in location object
    self.showMarkerInfoWindow = function(location) {
      location.getData()
        .done(location.getDataSuccess())
        .fail(location.getDataFail());
    };

    window.addEventListener('load', function() {
      self.renderMapMarkers();
    });

  };  
})();