console.log("Geef niet op Thomas, je kunt het!");
// Constants
startYear = 1960;
endYear = 2009;
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

var graphData;
var lineData;
var countriesInGraph_Importdata = [];
var countriesInGraph_Exportdata = [];
var countriesInGraph_name = [];
var graphInitialized = false;
var selectedCountries = {};
d3.json('Data/Data files/convertedtradeflows.json', function(error,graphdata)
{
  graphData = graphdata;
  drawBars(endYear);
  drawGraph("GRC");
  map.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
            drawGraph(geography.id);
            drawLines(geography.id, 2009);
        });
})
d3.json('Data/Data files/countrylines.json', function(error,linedata)
{
  lineData = linedata;
  map.svg.selectAll(".datamaps-subunit") //uit datamaps.world.js onder 'labels'
    .attr("x", function(d) {
      return map.path.centroid(d)[0]})
    .attr('y', function(d) {
      return map.path.centroid(d)[0]})
})

function drawBars(year)
{
  //draw import
  var imports = graphData['Imports'][year];
  var exports = graphData['Exports'][year];
  var keys = Object.keys(imports);
  var importvalues = Object.keys( imports ).map(function ( key ) { return imports[key]; });
  var exportvalues = Object.keys( exports ).map(function ( key ) { return exports[key]; });
  var max = Math.max(Math.max.apply(Math,importvalues),Math.max.apply(Math,exportvalues));
  x = d3.scale.linear()
                  .domain([0,max])
                  .range([0,30]);
  d3.select("#map").selectAll("rect")
    .data(imports)
    .enter().append("rect")
    .attr("width","5px")
    .attr("height", function(d){return x(d)})

}
function drawGraph(country)
{
  countryAlreadySelected = false;
  for(var i = 0; i < countriesInGraph_name.length;i++)
  {
    if(countriesInGraph_name[i] == country)
    {
      console.log("should remove country now");
      d3.selectAll('#'+ country + '_linegraph').remove();
      countriesInGraph_Importdata.splice(i,1);
      countriesInGraph_Exportdata.splice(i,1);
      countriesInGraph_name.splice(i,1);
      selectedCountries[country] = '#ABDDA4'
      countryAlreadySelected = true;
    }
  }
  if(countryAlreadySelected == false)
  {
    countriesInGraph_name.push(country);
    var countryImport=[];
    var countryExport=[];
    for(var i=startYear;i<endYear + 1;i++)
    {
      countryImport.push(Math.round(graphData["Imports"][i][country]));
      countryExport.push(Math.round(graphData["Exports"][i][country]));
    }

    for(i=0; i < countryImport.length; i++)
    {
      if(isNaN(countryImport[i]))
      {
        countryImport[i] = 0;
      }
      if(isNaN(countryExport[i]))
      {
        countryExport[i] = 0;
      }
    }
    countriesInGraph_Exportdata.push(countryExport);
    countriesInGraph_Importdata.push(countryImport);
  }
  var years = Array.apply(null, Array(endYear - startYear + 1)).map(function (_, i) {return startYear + i;});
  var maxImport = [];
  var maxExport = [];
  for(var i = 0; i < countriesInGraph_Importdata.length; i++)
  {
    maxImport.push(Math.max.apply(Math, countriesInGraph_Importdata[i]));
    maxExport.push(Math.max.apply(Math, countriesInGraph_Exportdata[i]));
  }
  var vis = d3.select("#visualisation"),
    WIDTH = 1000,
    HEIGHT = 500,
    MARGINS = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 80
    },
    xScale = d3.scale.linear()
              .range([MARGINS.left, WIDTH - MARGINS.right])
              .domain([startYear,endYear]),
    yScale = d3.scale.linear()
              .range([HEIGHT - MARGINS.top, MARGINS.bottom])
              .domain([0, Math.max(Math.max.apply(Math,maxExport),Math.max.apply(Math,maxImport))]),
    xAxis = d3.svg.axis()
      .scale(xScale)
      .tickSize(10)
      .tickSubdivide(true),
    yAxis = d3.svg.axis()
      .scale(yScale)
      .tickSize(10)
      .orient('left')
      .tickSubdivide(true);

  if(graphInitialized == false)
  {
  vis.append('svg:g')
    .attr('class', 'axis')
    .attr('id', 'xaxis')
    .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
    .call(xAxis);

  vis.append('svg:g')
    .attr('id','yaxis')
    .attr('class', 'axis')
    .attr('transform', 'translate(' + (MARGINS.left) + ','+(MARGINS.bottom-40)+')')
    .call(yAxis);
  graphInitialized = true;
  }
  else
  {
    vis.select('#yaxis')
    .transition().duration(100)
    .call(yAxis);
  }

  var lineFunc = d3.svg.line()
            .x(function(d,i) {
              return xScale(parseInt(years[i]));
            })
            .y(function(d,i) {
              return yScale(d);
  })
  .interpolate('linear');

  var colours = ['red', 'blue', 'yellow','green', 'purple', 'orange', 'magenta','cyan', 'lime','black'];
  
  vis.selectAll('.import')
    .transition().duration(1000)
    .attr('d', function(d,i){return lineFunc(d,years)});

  vis.selectAll('.export')
    .transition().duration(1000)
    .attr('d', function(d,i){return lineFunc(d,years)});

  vis.selectAll('.import')
    .data(countriesInGraph_Importdata).enter().append('svg:path')
    .attr('d', function(d,i){return lineFunc(d,years)})
    .attr('class','lines')
    .attr('class','import')
    .attr('stroke', function(d,i){return colours[i%colours.length]})
    .attr('id', country + "_linegraph")
    .attr('stroke-width', 2)
    .attr('fill', 'none')
    .attr('transform', 'translate(0,'+(MARGINS.bottom-40)+')');  

  vis.selectAll('.export')
    .data(countriesInGraph_Exportdata).enter().append('svg:path')
    .attr('d', function(d,i){return lineFunc(d,years)})
    .attr('class','lines')
    .attr('class', 'export')
    .attr('id', country + "_linegraph")
    .attr('stroke', function(d,i){return colours[i%colours.length]})
    .style("stroke-dasharray", ("3, 3"))
    .attr('stroke-width', 2)
    .attr('fill', 'none')
    .attr('transform', 'translate(0,'+(MARGINS.bottom-40)+')');

  map.svg.selectAll('.datamaps-subunit') //http://bl.ocks.org/dmachat/b75a5a01cfb31cf92cf5 
  {
    if(countryAlreadySelected == false)
    {
      var colour = document.getElementById(country + "_linegraph").getAttribute('stroke')
      selectedCountries[country] = colour;
    }
    console.log(selectedCountries);
    map.updateChoropleth(selectedCountries);
  };
}

function drawLines(country, year)
{
  var importDict = lineData['Imports'][year][country];
  var exportDict = lineData['Exports'][year][country];
  var importKeys = Object.keys(importDict);
  var exportKeys = Object.keys(exportDict);
  for(var i = 0; i < importKeys.length; i++)
  {
    superdict = []
    for(var i = 0; i < importKeys.length; i++)
    {
      dict = {}
      // dict['origin'] = {'latitude':document.getElementsByTagName('datamaps-subunit '+country).getAttribute('class'),
      //                   'longitude':document.getElementsByTagName('datamaps-subunit '+country).getAttribute('x')};
      // dict['destination'] = {'latitude':document.getElementsByTagName('datamaps-subunit '+importKeys[i]).getAttribute('y'), 
      //                         'longitude': document.getElementsByTagName('datamaps-subunit '+importKeys[i]).getAttribute('x')};
      // dict['options'] = {'stroke-width': (importDict[importKeys[i]] / 10000), strokeColor : 'red'};
      superdict.push(dict)
    }
    map.arc(superdict);
    
  }



}