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
d3.json('Data/Data files/convertedtradeflows.json', function(error,graphdata)
{
  graphData = graphdata;
  drawBars(endYear);
  drawGraph("GRC");
  map.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
            drawGraph(geography.id);
        });
})
d3.json('Data/Data files/countrylines.json', function(error,linedata)
{
  lineData = linedata;
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
 // var countries = d3.selectAll(".country")
  d3.select("#map").selectAll("rect")
                          .data(imports)
                          .enter().append("rect")
                          .attr("width","5px")
                          .attr("height", function(d){return x(d)})

}
function drawGraph(country)
{
  for(var i = 0; i < countriesInGraph_name.length;i++)
  {
    if(countriesInGraph_name[i] == country)
    {
      console.log("should remove country now");
      d3.selectAll('#'+ country).remove();
      countriesInGraph_Importdata.splice(i,1);
      countriesInGraph_Exportdata.splice(i,1);
      return
    }
    //Hier een else toevoegen waarin je data van het land ophaalt en verwerkt!
  }
  countriesInGraph_name.push(country);
  var countryImport=[];
  var countryExport=[];
  var years = [];
  for(var i=startYear;i<endYear + 1;i++)
  {
    countryImport.push(Math.round(graphData["Imports"][i][country]));
    countryExport.push(Math.round(graphData["Exports"][i][country]));
    years.push(i);
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
  
vis.selectAll('.lines')
  .transition().duration(1000)
  .attr('d', function(d,i){return lineFunc(d,years)});

  vis.selectAll('.lines')
  .data(countriesInGraph_Importdata).enter().append('svg:path')
  .attr('d', function(d,i){return lineFunc(d,years)})
  .attr('class','lines')
  .attr('stroke', function(d,i){return colours[i%colours.length]})
  .attr('id', country)
  .attr('stroke-width', 2)
  .attr('fill', 'none')
  .attr('transform', 'translate(0,'+(MARGINS.bottom-40)+')');  

}



