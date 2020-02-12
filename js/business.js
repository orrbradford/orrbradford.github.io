width = 400;
height = 400;
var margin = {top: 50, right: 50, bottom: 50, left: 50};
let dataset = [];
// tooltip     
var tooltip = d3.select('#bar').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);


function drawBar(data) {
      // setting up x and y scale for data
    // create svg element for map

    var svg = d3.select('#bar').append('svg')
        .attr('viewBox', '0 0 ' + 2500 + ' ' + 600)
     
    var bar = svg.style('float','left')
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'); 
 

    function drawReport(data){

        loc=data.location
        time=data.date
        dy=1

          //filterData=data2.filter(function(d){return d.location==loc})

                       // adding bar chart to svg
          var report = svg.append('g')
              .attr('transform', 'translate(' + (600 + margin.left) + ',' + margin.top + ')')
              .attr("align","center")
              .attr("id","reportID");

          d3.csv('data/cc_cars2.csv')
            .then(function(data) {
              filterData=data.filter(function(d){
                return d.location==loc && d.date==time
              })
              console.log(filterData)

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
                    .style("font-size", "20px") 
                    .text(function(d) { 
                      console.log(d.FirstName)
                      return d.FirstName + '   ' +d.LastName_x + "          " +d.timestamp+ "          " +d.price 
                    });

            });

    }
         // console.log(d)
   // set click count back to 0
    // setting up x and y scale for data
    var xScale = d3.scaleBand()
        .range([0, width])
        .padding([0.2]);

    var yScale = d3.scaleLinear()
        .range([height, 0]);

    xScale.domain(data.map(function(d) { return d.time; }));
    yScale.domain([0, d3.max(data, function(d) { return +d.price; })]);


    bar.selectAll('.bar')
        .data(data)
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
          .data(data)
          .enter()
          .append("text")
         // .attr("dy", ".75em")
          .attr("dx", ".75em")
          .attr("y", function(d) { return yScale(+d.price); })
          .attr("x", function(d) { return xScale(d.time); })
          .attr("text-anchor", "middle")
          .text(function(d) { return d.fullName; });

    bar.append('text')
          .attr("x", (width / 2))             
          .attr("y", 0 - (margin.top / 2))
          .attr("text-anchor", "middle")  
          .style("font-size", "16px") 
          .style("text-decoration", "underline") 
          .data(data)
          .text(function(d) { return d.location});
    
    // add the x axis
    bar.append('g')
        .attr('id', 'scale')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(xScale))
        .selectAll("text")
          .attr("dx", "-.8em")
          .attr("dy", "1em")
          .attr("transform", "rotate(-45)");
  
    // add the y axis
    bar.append('g')
        .attr('id', 'scale')
        .call(d3.axisLeft(yScale))
        .append("text")
        //.attr("transform", "rotate(-90)")
        .attr("fill", "black") 
        .attr("y", 6)
        .attr("dy", "-2em")
        .style("text-anchor", "middle")
        .text("Sales");
}


// upload data and draw the map
d3.csv('data/cc_merge.csv')
    .then(function(data) {

        //create list of unique locations
        locations=[]
        data.forEach(function(d){
          if (locations.includes(d.location)){
          }
          else{
            locations.push(d.location)
          }
        })

        locations.forEach(function(loc){
            data2=data
            filterData=data2.filter(function(d){return d.location==loc})
            drawBar(filterData)
        });
          //console.log(d)
    }
);