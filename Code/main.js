var graphdata = d3.json('/Data/Data files/convertedtradeflows.json'); //(with path)
var linedata = d3.json('/Data/Data files/countrylines.json');

var map = new Datamap({
        scope: 'world',
        element: document.getElementById('map'),
        setProjection: function(element) {
          var projection = d3.geo.equirectangular()
            .center([15, 55])
            .rotate([8, 0])
            .scale(850)
            .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
          var path = d3.geo.path()
            .projection(projection);

          return {path: path, projection: projection};
        },})

console.log("Ga door")
console.log(graphdata.Imports)


