var width = 800;
var height = 400;
test = [
    {
      "Timestamp": "1/6/14 6:28",
      "id": 35,
      "lat": 36.0762253,
      "long": 24.87468932
    },
    {
      "Timestamp": "1/6/14 6:28",
      "id": 35,
      "lat": 36.07622006,
      "long": 24.87459598
    },
    {
      "Timestamp": "1/6/14 6:28",
      "id": 35,
      "lat": 36.07621062,
      "long": 24.87444293
    }
  ];

//array of information about locations for bar chart
var locations=[]

d3.csv('data/cc_merge.csv')
    .then(function(data) {
        locations=data
    });



//========================================================================
//                      DRAW BAR CHART
//========================================================================
function barChart(loc){
    var margin = {top: 50, right: 50, bottom: 50, left: 50};

    console.log(locations)
    locData=locations.filter(function(d){return d.location==loc})

    var svg = d3.select('#bdy').append('svg')
        .attr('viewBox', '0 0 ' + 1750 + ' ' + 600,'translate(500 0)')

     
    var bar = svg.style('float','left')
        .append('g')
        .attr('transform', 'translate(' + 400 + ',' + (100+margin.top) + ')'); 
 

        var xScale = d3.scaleBand()
        .range([0, width])
        .padding([0.2]);

    var yScale = d3.scaleLinear()
        .range([height, 0]);

    xScale.domain(locData.map(function(d) { return d.time; }));
    yScale.domain([0, d3.max(locData, function(d) { return +d.price; })]);


    bar.selectAll('.bar')
        .data(locData)
        .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', function(d) { 
           // console.log(d)
            return (xScale(d.time)); })
          .attr('width', xScale.bandwidth())
          .attr('y', function(d) { return yScale(+d.price) })
          .attr('fill', 'lightgrey')
          .attr('height', function(d) { return height - yScale(+d.price); })
          .on('mouseover', function(d){
    
              d3.select(this).transition()
                  .duration(500)
                  .attr("r", 25)
                  .transition()
                  .duration(500)
                  .attr("r", 1);

              drawReport(d)
          })
          .on('mouseout', function (d, i) {
             svg.selectAll('#reportID').remove();
  
          })
    bar.selectAll('.bar')
        .data(locData)
        .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', function(d) { 
           // console.log(d)
            return (xScale(d.time)); })
          .attr('width', xScale.bandwidth())
          .attr('y', function(d) { return yScale(+d.price) })
          .attr('fill', 'lightgrey')
          .attr('height', function(d) { return height - yScale(+d.price); })
          .on('mouseover', function(d){
    
              d3.select(this).transition()
                  .duration(500)
                  .attr("r", 25)
                  .transition()
                  .duration(500)
                  .attr("r", 1);

              drawReport(d)
          })
          .on('mouseout', function (d, i) {
             svg.selectAll('#reportID').remove();
  
          })

    //add number of clients on top of the bars
    bar.selectAll(".text")
          .data(locData)
          .enter()
          .append("text")
          .attr("dx", ".75em")
          .style("font-size", "30px") 
          .attr("y", function(d) { return yScale(+d.price); })
          .attr("x", function(d) { return xScale(d.time); })
          .attr("text-anchor", "middle")
          .text(function(d) { return d.fullName; });

//title of location
    bar.append('text')
          .attr("x", (width / 2))             
          .attr("y", 0 - (margin.top / 2))
          .attr("text-anchor", "middle")  
          .style("font-size", "30px") 
          .data(locData)
          .text(function(d) { return d.location});
    
    // add the x axis
    bar.append('g')
        .attr('id', 'scale')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(xScale))
        .selectAll("text")
          .attr("dx", "-.8em")
          .attr("dy", "1em")
          .style("font-size", "16px") 
          .attr("transform", "rotate(-45)");
  
    // add the y axis
    bar.append('g')
        .attr('id', 'scale')
        .call(d3.axisLeft(yScale))
        .append("text")
            .style("font-size", "16px") 
        .attr("fill", "black")
 
        .attr("y", 6)
        .attr("dy", "-2em")
        .style("text-anchor", "middle")
        .text("Sales")
        .selectAll("text")
            .style("font-size", "16px") 



    function drawReport(data){

        loc=data.location
        time=data.date
        dy=1

      var report = svg.append('g')
          .attr('transform', 'translate(' + (800 + margin.left) + ',' + margin.top + ')')
          .attr("align","center")
          .attr("id","reportID");

      d3.csv('data/cc_cars2.csv')
        .then(function(data) {
          filterData=data.filter(function(d){
            return d.location==loc && d.date==time
          })

          report.selectAll('text')
                .data(filterData)
                .enter()
                .append("text")
                .attr("x",100)   
                .attr("y", function(d) {
                  dy=dy+40
                  return dy
                })
                .attr("text-anchor", "middle")  
                .style("font-size", "25px") 
                .attr('transform', 'translate(' + 500 + ',' + 50 + ')')

                .text(function(d) { 
                  return d.FirstName + '   ' +d.LastName_x + "          " +d.timestamp+ "          " +d.price 
                });
        });
    }

}

//========================================================================
//                      DRAW MAP
//========================================================================
function reload(){
    d3.select("#bdy").selectAll("*").remove();
    d3.json("data/Abila.json")
    .then(topo => {
        abilafeatures = topojson.feature(topo, topo.objects["Abila"]).features
        var geoData = topojson.feature(topo, {
            type:"GeometryCollection",
            geometries: topo.objects["Abila"].geometries,
          })
        var projection = d3.geoMercator().fitSize([width, height], geoData)
        var path = d3.geoPath().projection(projection);
        var svg = d3.select("#bdy").append("svg")
                        .attr("width", width)
                        .attr("height", height);
        svg.selectAll("path")
            .data(geoData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("stroke", "lightgrey")
            .style("stroke-width", "1")

            .on("click", function(d, i){
            });
        //define tooltip
        var tooltip = d3.select('#bdy').append('div')
         .attr('class', 'tooltip')
         .style('opacity', 0);

        //add circles to svg
        var data;
        Papa.parse('data/locations.csv',{
            header: true,
            download: true,
            dynamicTyping: true,
            complete: function(results){
                data1 = results.data;
                const node = svg.selectAll("g")
                    .data(data1)
                    .enter()
                    .append("g")
                    .attr("x", function (d) { 
                        return projection([d[" longitude"],d[" latitude"]])[0]; 
                    })
                    .attr("y", function (d) { return projection([d[" longitude"],d[" latitude"]])[1]; })
                   .on("click", function(d){
                        barChart(d["location"])
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
                    });

                //draw circle on top of node
                var circle = node.append("circle")
                        .data(data1)
                        .attr("r", "10px")
                        .attr("fill", "steelblue")
                        .attr("opacity", "0.4")
                        .attr("cx", function (d) { 
                            return projection([d[" longitude"],d[" latitude"]])[0]; 
                        })
                        .attr("cy", function (d) { return projection([d[" longitude"],d[" latitude"]])[1]; })
            }
        });
        Papa.parse('data/fullgpsedited.csv',{
            header: true,
            download: true,
            dynamicTyping: true,
            complete: function(results){
                data = results.data;
                res = []
                dayfilter = document.getElementById("Day").value;
                IDfilter = document.getElementById("ID").value;
                for(i in data){
                    if(dayfilter == data[i]["Date"] && IDfilter == data[i]["id"]){
                        res.push(data[i]);
                    }
                }
                svg.selectAll("circle")
                    .data(res)
                    .enter()
                    .append("circle")
                    .attr("cx", function (d) { 
                        return projection([d["long"],d["lat"]])[0]; 
                    })
                    .attr("cy", function (d) { return projection([d["long"],d["lat"]])[1]; })
                    .attr("r", "1px")
                    .attr("fill", "teal")
                    .on("click", function(d, i){
                    });
                d3.select("#dayRange").on("input",function(){
                        let day = this.value;
                        date = "1/" + day + "/14"
                        svg.selectAll("svg circle").each(function(d){
                            this.style.opacity = (d.Date == date ? 1:0)
                        })
                    });
                
            }
         });
    });
}