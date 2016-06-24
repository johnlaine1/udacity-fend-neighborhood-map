/* global ko google $ map */

var app = app || {};

(function () {
  'use strict';

  // Data used to create the initial locations.
  app.locationData = [
    {
    id: "50eb8a09e4b0727b01907fc5",
    title: "Backyard Taco",
    position: {lat: 33.422682947210866, lng: -111.79822531628174}
    },
    {
    id: "4b0c49d2f964a520853a23e3",
    title: "Culver's", 
    position: {lat: 33.379965, lng: -111.839551}
    },
    {
    id: "4aaf0c3df964a520016420e3",
    title: "Bahama Buck's", 
    position: {lat: 33.393008708952884, lng: -111.82480278}
    },
    {
    id: "4ae65a44f964a52096a621e3",
    title: "Sprouts Farmers Market", 
    position: {lat: 33.39217691541613, lng: -111.71810413726668}
    },
    {
    id: "4ac7a034f964a52090b820e3",
    title: "T.C. Eggington's", 
    position: {lat: 33.383771, lng: -111.859321}
    }
  ];
  
  /**
   * A class to represent a location point.
   */
  app.Location = function(data) {
    var self = this;

    self.id = ko.observable(data.id);
    self.title = ko.observable(data.title);
    self.position = ko.observable(data.position);
    self.mapMarker = new google.maps.Marker({
      position: {lat: self.position().lat, lng: self.position().lng},
      title: self.title(),
      animation: google.maps.Animation.DROP,
      map: null
    });
    
    self.mapMarker.addListener('click', function() {
      self.getData()
        .done(self.getDataSuccess())
        .fail(self.getDataFail()); 
    });
  }; 
  
  app.Location.prototype.infoWindowContent = function(data) {
    var name = data.name;
    var phone = data.contact.formattedPhone;
    var address = data.location.formattedAddress[0] + '<br>' + data.location.formattedAddress[1];
    return '<h3>' + name + '</h3>' +
           '<div>' + address + '</div>' +
           '<div>' + phone + '</div>';
  };
  app.Location.prototype.getData = function() {
    var self = this;
      return $.ajax({
        dataType: "json",
        url: self.fourSquare.baseUrl + self.id(),
        data: {
          client_id: self.fourSquare.clientID,
          client_secret: self.fourSquare.clientSecret,
          v: self.fourSquare.version
        }
      });
    };
  app.Location.prototype.getDataSuccess = function() {
    var self = this;
      return function(res) {
        // Show the info window
        app.infoWindow.setContent(self.infoWindowContent(res.response.venue));
        app.infoWindow.open(map, self.mapMarker);
        // Make the map icon bounce
        self.mapMarker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
          self.mapMarker.setAnimation(null);
          }, 750);   
        
        // ######### DEV ############
        console.log(res);
      };
  }; 
  app.Location.prototype.getDataFail = function() {
    var self = this;
    return function() {
      app.infoWindow.setContent('Sorry, there has been an error');
      app.infoWindow.open(map, self.mapMarker);        
    };
  };
  app.Location.prototype.fourSquare = {
    baseUrl: 'https://api.foursquare.com/v2/venues/',
    clientID: 'ME0C0R5XXBXVKZQDAHQCUNWJ0J2GUM4UOQ0C4QDD0QCKPOCK',
    clientSecret: 'RNTL40FOVCMQUSIMMQFJQJIVOJJS5C4R04DICO5BSEOKEBX3',
    version: '20160601'
  };

})();
