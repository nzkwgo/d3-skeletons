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


//scatter plots


// var chart = d3.select('body').append("svg");

// var circle = d3.select('svg').append('g');


// //circle.exit().remove();

// circle
//     .data(dataset)
//     .enter().append("circle")
//    .attr("cx", function(d) { return x(d.value1);  })
//    .attr("cy", function(d) { return y(d.value2);  })
//    .attr("r", 4)
//    .attr('class', "scatter")
//     .style("opacity", 0.3);

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

var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

  var arc = g.selectAll(".arc")
    .data(pie(dataset))
    .enter().append("g")
      .attr("class", "arc");

  arc.append("path")
      .attr("d", path)
      .attr("fill", function(d) { return color(d.name); });

  arc.append("text")
      .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
      .attr("dy", "0.35em")
      .text(function(d) { return d.value2; });


});