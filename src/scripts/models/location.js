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
    },
    {
    id: "4bff0d3f369476b08b4f8d1f",
    title: "RA Sushi Bar Restaurant",
    position: {lat: 33.38529959859565, lng: -111.75477504730225}
    },
    {
    id: "4b365a3bf964a5206b3325e3",
    title: "Cheba Hut",
    position: {lat: 33.39350516148516, lng: -111.86845779418945}
    },
    {
    id: "4b59150df964a520ab7b28e3",
    title: "Barro's Pizza",
    position: {lat: 33.436455264724906, lng: -111.78927898406982}
    },
    {
    id: "4b887f19f964a52038fc31e3",
    title: "Waldo's BBQ",
    position: {lat: 33.41577869844659, lng: -111.73247954030153}
    },
    {
    id: "52aa261911d26f5f9b3faaf7",
    title: "Pita Jungle",
    position: {lat: 33.385248298035464, lng: -111.75658988035073}
    },
    {
    id: "4afe1623f964a520cd2d22e3",
    title: "In-N-Out Burger",
    position: {lat: 33.389814545635794, lng: -111.85772895812988}
    },
    {
    id: "4c79cef681bca093e9dffe14",
    title: "Zur Kate",
    position: {lat: 33.414961, lng: -111.72683737}
    },
    {
    id: "546a7bb5498eae88ec062332",
    title: "The Draft Sports Grill",
    position: {lat: 33.390955834830145, lng: -111.85527781345631}
    },
    {
    id: "4a3303d6f964a520ed9a1fe3",
    title: "Cornish Pasty Co",
    position: {lat: 33.36260485627506, lng: -111.87603235244751}
    },
    {
    id: "4fd65d49e4b0540d9dd0f918",
    title: "Firehouse Subs",
    position: {lat: 33.38496125, lng: -111.8067624}
    },
    {
    id: "51c4ac3c498e29ade2521b06",
    title: "Republica Empanada",
    position: {lat: 33.413119617731645, lng: -111.82601512041239}
    },
    {
    id: "4bfd7254b68d0f4743cde857",
    title: "India Oven",
    position: {lat: 33.39177632454111, lng: -111.78789496421814}
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
    var websiteUrl = data.shortUrl;
    return '<h3><a href="' + websiteUrl + '"target=_blank>' + name + '</a></h3>' +
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
        app.infoWindow.open(app.map, self.mapMarker);
        // Make the map icon bounce
        self.mapMarker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
          self.mapMarker.setAnimation(null);
          }, 700);   
        
        // ######### DEV ############
        console.log(res);
      };
  }; 
  app.Location.prototype.getDataFail = function() {
    var self = this;
    return function() {
      app.infoWindow.setContent('Sorry, there has been an error');
      app.infoWindow.open(app.map, self.mapMarker);        
    };
  };
  app.Location.prototype.fourSquare = {
    baseUrl: 'https://api.foursquare.com/v2/venues/',
    clientID: 'ME0C0R5XXBXVKZQDAHQCUNWJ0J2GUM4UOQ0C4QDD0QCKPOCK',
    clientSecret: 'RNTL40FOVCMQUSIMMQFJQJIVOJJS5C4R04DICO5BSEOKEBX3',
    version: '20160601'
  };

})();
