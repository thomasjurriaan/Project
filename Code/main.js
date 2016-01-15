var graphData;
var lineData;
d3.json('Data/Data files/convertedtradeflows.json', function(error,graphdata)
{
  console.log("Geef niet op Thomas, je kunt het!")
  graphData = graphdata;
  drawBars(2009);
  drawGraph("GRC");
  done: function(datamap) {
        datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
            alert(geography.properties.name);
        });
    }
})
d3.json('Data/Data files/countrylines.json', function(error,linedata)
{
  lineData = linedata;
})

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
  var countryImport=[];
  var countryExport=[];
  var years = [];
  for(var i=1870;i<2010;i++)
  {
    countryImport.push(Math.round(graphData["Imports"][i][country]));
    countryExport.push(Math.round(graphData["Exports"][i][country]));
    years.push(i);
  }

  for(i=0; i < countryImport.length; i++)
  {
    if(isNaN(countryImport[i]))
    {
      countryImport[i] = 0
    }
  }
  console.log(countryImport)
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
              .domain([1870,2009]),
    yScale = d3.scale.linear()
              .range([HEIGHT - MARGINS.top, MARGINS.bottom])
              .domain([0,Math.max.apply(Math,countryImport)]),
    xAxis = d3.svg.axis()
      .scale(xScale)
      .tickSize(10)
      .tickSubdivide(true),
    yAxis = d3.svg.axis()
      .scale(yScale)
      .tickSize(10)
      .orient('left')
      .tickSubdivide(true);

  console.log(Math.max.apply(Math,countryImport));
  vis.append('svg:g')
  .attr('class', 'x axis')
  .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
  .call(xAxis);

  vis.append('svg:g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' + (MARGINS.left) + ','+(MARGINS.bottom-40)+')')
    .call(yAxis);

  var lineFunc = d3.svg.line()
  .x(function(d) {
    return xScale(years);
  })
  .y(function(d) {
    return yScale(countryImport);
  })
  .interpolate('linear');

  vis.append('svg:path')
  .attr('d', lineFunc(countryImport,years))
  .attr('stroke', 'blue')
  .attr('stroke-width', 2)
  .attr('fill', 'none');
}


