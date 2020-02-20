
var gsvg = d3.select("#graphsvg")
    .attr("width", 800)
    .attr("height", 400)

function drawGraph(){ 
gsvg.selectAll("*").remove()

var color = d3.scaleOrdinal(d3.schemeCategory10);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("x", d3.forceX(300))
    .force("y", d3.forceY(200))
    /*.force("r", d3.forceRadial(500).x(600).y(600));*/
    /*.force("center", d3.forceCenter(width / 2, height / 2));*/

  d3.json("graph.json").then(function(graph) {
    var filteredLinks = d3.values(graph.links).filter(function(d) { return ((d.hour >= document.getElementById("slider1").noUiSlider.get()[0]) && (d.hour <= document.getElementById("slider1").noUiSlider.get()[1]) && (d.day >= document.getElementById("slider").noUiSlider.get()[0]) && (d.day <= document.getElementById("slider").noUiSlider.get()[1]) ); });
    var filteredSources = d3.map(filteredLinks, d => d.source).keys();
    var filteredTargets = d3.map(filteredLinks, d => d.target).keys();
    var filteredNodeSet = new Set(d3.merge([filteredSources, filteredTargets]))
    var filteredNodes = d3.values(graph.nodes).filter(function(d) {return filteredNodeSet.has(d.id)} )
    gsvg.selectAll("*").remove();

    var tooltip=gsvg.append("div")
      .attr("class", "tooltip")  
      .style("visibility", "hidden");

    var link = gsvg.append("g")
        .attr("class", "links")
      .selectAll("line")
      .data(filteredLinks)
      .enter().append("line")
       // .style("stroke", "#045563")
          .style("stroke", "#0d5b63")
        .style("opacity", 0.15)

    var node = gsvg.append("g")
        .attr("class", "nodes")
      .selectAll("g")
      .data(filteredNodes)
      .enter().append("g")
      .on("mouseover", function(d) {    
            tooltip.transition()
                .style("visibility", "visible");    
            tooltip .html(d.id)  
                .style("left", (d3.event.pageX) + "px")   
                .style("top", (d3.event.pageY - 28) + "px");  
            })
        .on("mouseout", function(d) {   
            tooltip.transition()
                .style("visibility", "hidden"); 
        });
      
    var circles = node.append("circle")
        .attr("r", 5)
        .attr("fill", function(d) { return color(d.group); })
        .attr("id", function(d) {return "c"+d.CarID;})
        .style("stroke", "transparent")
      circles.call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    
 /*   var labels = node.append("text")
        .text(function(d) {
          return d.id;
        })
        .attr('x', 6)
        .attr('y', 3);*/

    node.append("title")
        .text(function(d) { return d.id; });

    
    simulation
        .nodes(filteredNodes)
        .on("tick", ticked)
        .force("charge", d3.forceManyBody().strength(-(gsvg.selectAll("circle").size()*3)));

    simulation.force("link")
        .links(filteredLinks);

    function ticked() {
      link
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      node
          .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
          })
    }

    var legend = gsvg.selectAll(".legend")
    .data(color.domain())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("circle")
        .attr("cx", 800 - 200)
        .attr("cy", 120)
        //.attr("width", 18)
        .attr("r", 5)
        .style("fill", color);

    legend.append("text")
        .attr("x", 800 - 180)
        .attr("y", 123)
        .style("text-anchor", "left")
        .text(function(d) { return d; });

        updateNetworkOpacity();
  })

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  
};

function updateNetworkOpacity(){
	if (idFilter.size>0){
		gsvg.selectAll("circle").style("opacity", 0.4)
		gsvg.selectAll("line").style("opacity", 0.05)
		for (i=0;i<idFilter.size;i++) {
			gsvg.select('#c'+Array.from(idFilter)[i]).style("opacity", 1).style("stroke", "black")
		}
		gsvg.selectAll(".legend").selectAll("circle").style("opacity", 1)
	}
	else{
		gsvg.selectAll("circle").style("opacity", 1).style("stroke", "transparent")
		gsvg.selectAll("line").style("opacity", 0.15)
	}
		

}