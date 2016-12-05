var map;

var routes = ['altisa','azul_blanco','calafias_rojas'];

var kml_files = {
                'altisa': 'https://www.dropbox.com/s/hrmlxg6tppnzo3e/altisa.kml?dl=1',
                'azul_blanco': 'https://www.dropbox.com/s/gzsdfl29czuvw93/azul_blanco.kml?dl=1',
                'calafias_rojas': 'https://www.dropbox.com/s/4t7k0elxqh0oi8h/calafias_rojas.kml?dl=1'
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
  //create_layers(e);
  $("#"+e).change(function () {
    checkbox_switch(this, e);
  });
})

});
