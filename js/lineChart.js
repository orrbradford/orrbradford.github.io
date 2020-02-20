//https://bl.ocks.org/gordlea/27370d1eea8464b04538e6d8ced39e89

var linePromise; 
var margin = {top: 20, right: 20, bottom: 20, left: 50};
var widthLine = 350;
var heightLine = 360;

function loadLineChart(location){

    hoverLabel=document.getElementById("hoverLabel")
    if (hoverLabel) { hoverLabel.remove() }

    console.log(location)
    var lineElem = document.getElementById("drawnLineChart")
    if (lineElem) { lineElem.remove() }
    linePromise = linePromise || d3.csv('data/cc_cars2.csv');
    return linePromise.then( res => {
        var n = 19 - 6;
        var ld = lineFilter(res, location)
        var lineData = ld[1];
        var yDomainMax = ld[0];
        /*console.log(yDomainMax)*/
        var xScale = d3.scaleLinear()
            .domain([6, 19])
            .range([0, widthLine]);
        /*console.log(Math.max(lineData))*/
        var max = 0;
        
        var yScale = d3.scaleLinear().domain([0, yDomainMax]).range([heightLine, 0]);

        
        var line = d3.line()
            .x(function(d, i) { return xScale(i+6);})
            .y(function(d) { return yScale(d); })   
           .curve(d3.curveMonotoneX) // apply smoothing to the line

        // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
        //var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })



        // 1. Add the SVG to the page and employ #2
        var svg2 = d3.select("#lineChart").append("svg")
            .attr("width", widthLine + margin.left + margin.right)
            .attr("height", heightLine + margin.top + margin.bottom)
            .attr("id", "drawnLineChart")
            .append("g")
            .attr("fill","black")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          svg2.append("text")
                  .attr("x", (width / 2)-100)             
                  .attr("y", 0 - (margin.top / 2)+75)
                  .attr("text-anchor", "middle")  
                  .style("font-size", "16px") 
                  .style("text-decoration", "underline")  
                  .text("Expenses by Day");

        // 3. Call the x axis in a group tag
        svg2.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + heightLine + ")")
            .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

        // 4. Call the y axis in a group tag
        svg2.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

        // 9. Append the path, bind the data, and call the line generator
        for(i in lineData){
            //console.log("checking " + i)
            if(true){

                svg2.append("path")
                .attr("id","theLine")
                .attr("stroke", function(d){
                  /*  console.log("PRINTING LINE DATA")
                    console.log(lineData)
                    console.log(i)
*/
                    id=parseInt(lineData['id'])
                    /*console.log(lineData[i].id)*/
                    return(color(lineData[i].id))
                })
                .attr("fill", "none")
                .datum(lineData[i].values.slice(6)) // 10. Binds data to the line 
                .attr("class", "chartLine") // Assign a class for styling 
                .attr("d", line); // 11. Calls the line generator 
                // 12. Appends a circle for each datapoint 
                // svg.selectAll(".dot")
                //     .data(lineData[i].values.slice(6))
                //     .enter()
                //     .append("circle") // Uses the enter().append() method
                //     .attr("class", "dot") // Assign a class for styling
                //     .attr("cx", function(d, j) { return xScale(j+6) })
                //     .attr("cy", function(d) { 
                //         console.log(d)
                //         return yScale(d) 
                //     })
                //     .attr("r", 5)
                //     .on("mouseover", function(a, b, c) { 
                //             console.log(a) 
                //         this.attr('class', 'focus')
                //         })
                //     .on("mouseout", function() {  })
            } 
        }  
    });
}

function lineFilter(data, location){
    var max = 0;
    var res = {}
    var dayOffset = 6
    // for(i = 6; i < 19; i++){
    //     res.push(parseInt(0))
    // }
    /*console.log(idFilter)*/
    for(let i of idFilter.keys()){
        /*console.log("key check")*/
        res[i] = {id: i, values:[]}
        for( j = 6; j<20; j++){
            res[i].values[j] = 0
        }
    }
    /*console.log(res)*/
    //return res
    for(i in data){
        loc = String(data[i]["location"])
        carId = Math.trunc(data[i]['CarID'])
        //console.log(loc, carId, id, id == carId)
        if (loc == String(location) && carId in res){
            day = data[i]["timestamp"].split(" ")[0].split("/")[1]
            price = parseFloat(data[i]['price'])
            /*console.log(day, price)*/
            res[carId].values[day] += price
            if(res[carId].values[day] > max){
                max = res[carId].values[day]
            }
        }

    }
    //console.log(res)
    return [max, res]

}

function deleteLineChart(){
    var lineElem = document.getElementById("drawnLineChart")
    if (lineElem) { lineElem.remove() }
}

