var app=app||{};!function(){"use strict";app.MapViewModel=function(){var a=this;a.locationList=ko.observableArray([]),app.locationData.forEach(function(e){a.locationList.push(new app.Location(e))}),a.searchInput=ko.observable(""),a.searchType=ko.observable("exact"),a.filteredLocations=ko.computed(function(){var e,t=a.searchInput().toLowerCase();return t?a.locationList().filter(function(o){e=o.title.toLowerCase();for(var i=0,n=t.length;i<n;i++)if("contains"===a.searchType()){if(!e.includes(t[i]))return o.mapMarker.setVisible(!1),!1}else if("exact"===a.searchType()&&e[i]!==t[i])return o.mapMarker.setVisible(!1),!1;return o.mapMarker.setVisible(!0),!0}):(a.locationList().forEach(function(a){a.mapMarker.setVisible(!0),app.mapBounds.extend(a.coords)}),app.map.fitBounds(app.mapBounds),a.locationList())}),a.locationItemClick=function(a){a.getData().done(a.getDataSuccess()).fail(a.getDataFail()),app.map.setZoom(15),app.map.setCenter(a.mapMarker.getPosition())},window.addEventListener("load",function(){a.filteredLocations().forEach(function(a){a.mapMarker.setMap(app.map)})})}}();