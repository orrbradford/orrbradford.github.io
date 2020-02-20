var width = 950;
var height = 550;
var mapPromise;
var gpsPromise;
var cityPromise;
var projection;


function loadMap(){
    mapPromise = mapPromise || d3.json('data/Abila.json');
    return mapPromise.then( topo => {
        //console.log(topo);
        abilafeatures = topojson.feature(topo, topo.objects["Abila"]).features
        var geoData = topojson.feature(topo, {
            type:"GeometryCollection",
            geometries: topo.objects["Abila"].geometries,
          })
        //console.log(geoData)
        projection = d3.geoMercator().fitSize([width, height], geoData)
        var path = d3.geoPath().projection(projection);
        var svg = d3.select("#bdy").append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .attr("id", "mapSVG");
        svg.selectAll("path")
            .data(geoData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("stroke", "steelblue")
            .on("click", function(d, i){
                /*console.log(d)*/
            });
        var tooltip = d3.select('#bdy').append('div')
            .attr('class', 'tooltip')
            .attr('id', 'tooltip')
            .style('opacity', 0);
        svg.append('svg:image')
            .attr('xlink:href', 'data/MC2-tourist.jpg')
            .attr("width", width)
            .attr("height", height)
            .attr("x", '-50px')
            .attr("y", 0)
            .style('opacity', .5);
        drawCities();
    });
}

function drawGPS(){
    /*console.log("drawing gps");*/
    gpsPromise = gpsPromise || papaPromiseGPS('data/gpsshrink.csv');
    gpsPromise.then(res => {
        var filteredData = filterGPS(res)
        //console.log(filteredData)
        var svg = d3.select("#mapSVG");
        svgWithData = svg.selectAll("rect").data(filteredData);
        svgWithData
            .enter()
            .append("rect")
            .attr("x", function (d) { 
                return projection([d["long"],d["lat"]])[0]; 
            })
            .attr("y", function (d) { return projection([d["long"],d["lat"]])[1]; })
            .attr('width', '2px')
            .attr('height', '2px')
            .attr("fill", function(d){
                /*index=parseInt(d["id"])*/
                return color(d["id"].toString())

            })
            .attr('opacity', 0.5)
            .on("click", function(d, i){
                /*console.log(d);*/
            });
        
        svgWithData.exit().remove();
                    
        d3.select("#dayRange").on("input",function(){
                console.log("Houston");
                //alert("click");
                let day = this.value;
                date = "1/" + day + "/14"
                svg.selectAll("svg circle").each(function(d){
                    this.style.opacity = (d.Date == date ? 1:0)
                })
            });
        drawCities();
    })    
}

function drawCities(){
    cityPromise = cityPromise || papaPromise('data/locations.csv');
    cityPromise.then(res => {
        /*console.log(res);*/
        var svg = d3.select("#mapSVG");
        var tooltip = d3.select("#tooltip")
        /*console.log("drawing cities");*/
        var node = svg.selectAll("g")
            .data(res)
            .enter()
            .append("g")
            .attr("x", function (d) { 
                //console.log(projection([d["longitude"],d["latitude"]])); 
                return projection([d[" longitude"],d[" latitude"]])[0]; 
            })
            .attr("y", function (d) { 
                return projection([d[" longitude"],d[" latitude"]])[1]; 
            })
            .on("mouseover",function(d){
                tooltip.transition()
                    .style('opacity', .9);
                tooltip.html(d['location'])
                    .style('left', d3.mouse(this)[0] + 'px')
                    .style('top', d3.mouse(this)[1] + 'px');
           })
           .on("mouseout",function(d){
                tooltip.transition()
                .duration(50)
                .style('opacity', 0);
            })
            .on("click", function(d){
                barChart(d["location"])
            });
        var circle = node.append("circle")
            .attr("r", "10px")
            .attr("fill", "grey")
            .attr("opacity", "0.4")
            .attr("cx", function (d) { 
                return projection([d[" longitude"],d[" latitude"]])[0]; 
            })
            .attr("cy", function (d) { return projection([d[" longitude"],d[" latitude"]])[1]; })
                .on("click", function(d, i){
                    //display bar chart
                    //<script src='js/mel.js'> </script>
                    /*console.log(d);*/
                });
        // svg.selectAll("circle")
        //     .data(res)
        //     .enter()
        //     .append("circle")
        //     .attr("cx", function (d) { 
        //         return projection([d[" longitude"],d[" latitude"]])[0]; 
        //     })
        //     .attr("cy", function (d) { 
        //         return projection([d[" longitude"],d[" latitude"]])[1]; 
        //     });
    });
    
}