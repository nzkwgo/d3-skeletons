// Template taken from https://bl.ocks.org/mbostock/3887235
//dimensions declarations
var width = 650;
var height = 400;
var margin = {top: 20, right: 15, bottom: 30, left: 40};
var w = width - margin.left - margin.right;
var h = height - margin.top - margin.bottom;

//dataset declarations
var csv = "flavors_of_cacao.csv";//Your CSV file here;
var dataset;

d3.csv(csv, function(error, data) {
    //read in the data
    if (error) return console.warn(error);
        data.forEach(function(d) {
            d.name = d.Company; //Your data name here
            d.value1 = + d.Rating; //Your data value here
            d.value2 = + d.CocoaPercent.slice(0, 2)
    });
    dataset = data;    

//pie charts

var svg = d3.select('body').append('svg'),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    radius = Math.min(width, height) / 2,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.value2; });

//Calculate pie chart arc  geometries
var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

//radius offsets put label to the edge of pie
var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

//Generate pie slices based on data
var arc = g.selectAll(".arc")
    .data(pie(dataset))
    .enter().append("g")
    .attr("class", "arc");

    //Color the pie segments based on unique names
    arc.append("path")
      .attr("d", path)
      .attr("fill", function(d) { return color(d.name); });

    //Adds text to pie chart
    arc.append("text")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      .attr("dy", "0.35em")
      .text(function(d) { return d.value2; });
});