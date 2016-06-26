var app=app||{};!function(){"use strict";app.MapViewModel=function(){var a=this;a.locationList=ko.observableArray([]),app.locationData.forEach(function(e){a.locationList.push(new app.Location(e))}),a.searchInput=ko.observable(""),a.searchType=ko.observable("exact"),a.filteredLocations=ko.computed(function(){var e,t=a.searchInput().toLowerCase();return t?a.locationList().filter(function(r){e=r.title().toLowerCase();for(var o=0,n=t.length;o<n;o++)if("contains"===a.searchType()){if(!e.includes(t[o]))return!1}else if("exact"===a.searchType()&&e[o]!==t[o])return!1;return!0}):a.locationList()}),a.filteredLocations.subscribe(function(e){a.renderMapMarkers()}),a.clearAllMarkers=function(){a.locationList().forEach(function(a){a.mapMarker.setMap(null)})},a.renderMapMarkers=function(){a.clearAllMarkers(),a.filteredLocations().forEach(function(a){a.mapMarker.setMap(app.map)})},a.showMarkerInfoWindow=function(a){a.getData().done(a.getDataSuccess()).fail(a.getDataFail())},window.addEventListener("load",function(){a.renderMapMarkers()})}}();