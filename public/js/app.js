var map;

var geocoder = new google.maps.Geocoder;

var routes = ['altisa','azul_blanco','calafias_rojas','camiones_untima','verde_crema'];

var kml_files = {
                'altisa': 'https://www.dropbox.com/s/hrmlxg6tppnzo3e/altisa.kml?dl=1',
                'azul_blanco': 'https://www.dropbox.com/s/gzsdfl29czuvw93/azul_blanco.kml?dl=1',
                'calafias_rojas': 'https://www.dropbox.com/s/4t7k0elxqh0oi8h/calafias_rojas.kml?dl=1',
                'camiones_untima' : 'https://www.dropbox.com/s/nvhh5ps8xvfxx4h/camiones_untima.kml?dl=1',
                'verde_crema' : 'https://www.dropbox.com/s/z67n2pnkua9n39p/verde_crema.kml?dl=1',
              };

var layers=[];

var show_layer = function (v) {
    console.log('add ' + kml_files[v]);
    layers[v] = map.loadFromKML({url: kml_files[v], preserveViewport: true});
}
var clean_layer = function (v) {
    console.log('rmv ' + kml_files[v]);
    map.removeLayer(layers[v]);
}

var checkbox_switch = function (c,n) {
  if($(c).is(':checked')){
    show_layer(n);
  }else{
    clean_layer(n);
  }
}

$(document).ready(function(e){

map = new GMaps({
  div: '#map_container',
  lat: 32.499387,
  lng: -116.966805
});

routes.forEach(function (e) {
  $("#"+e).change(function () {
    checkbox_switch(this, e);
  });
})

$('.locate').click(function () {
  GMaps.geolocate({
          success: function(position) {
            var lati = position.coords.latitude;
            var lngi = position.coords.longitude;
            var latlng = {lat: lati, lng: lngi};

            geocoder.geocode({'location': latlng}, function(results, status) {
              if (status === 'OK') {
                if (results[1]) {
                  $( ".address" ).text( results[1].formatted_address );

                } else {
                  window.alert('No results found');
                }
              } else {
                window.alert('Geocoder failed due to: ' + status);
              }
            });

            map.setCenter(lati, lngi);
            map.setZoom(18);
            map.addMarker({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
            });

          },
          error: function(error) {
            alert('Geolocation failed: '+error.message);
          },
          not_supported: function() {
            alert("Your browser does not support geolocation");
          }
      });
});

});


function geocodeLatLng(geocoder, map, infowindow) {
  var input = document.getElementById('latlng').value;
  var latlngStr = input.split(',', 2);
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};

}
