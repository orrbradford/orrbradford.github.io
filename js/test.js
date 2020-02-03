var width = 950;
var height = 550;
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

// var data;
// Papa.parse('data/fullgpsedited.csv',{
//     header: true,
//     download: true,
//     dynamicTyping: true,
//     complete: function(results){
//         console.log(results);
//         data = results.data;
//     }
// });

//var test = require('data/testday.json');
function click(){
    console.log("clicked");
}

// d3.json("data/Abila.json", function(error, topo) {
//     console.log(topo);
//     abilafeatures = topojson.feature(topo, topo.objects["Abila"]).features
//     var geoData = topojson.feature(topo, {
//         type:"GeometryCollection",
//         geometries: topo.objects["Abila"].geometries,
//       })
//     console.log(geoData)
//     var projection = d3.geoMercator().fitSize([width, height], geoData)
//     var path = d3.geoPath().projection(projection);
//     var svg = d3.select("bdy").append("svg")
//                     .attr("width", width)
//                     .attr("height", height);
//     svg.selectAll("path")
//         .data(geoData.features)
//         .enter()
//         .append("path")
//         .attr("d", path)
//         .style("stroke", "steelblue")
//         //.attr("cx", function (d) { console.log(projection(d)); return projection(d)[0]; })
//         .on("click", function(d, i){
//             console.log(d)
//         });
//     //add circles to svg
//     var data;
//     Papa.parse('data/fullgpsedited.csv',{
//         header: true,
//         download: true,
//         dynamicTyping: true,
//         complete: function(results){
//             console.log(results);
//             data = results.data;
//             res = []
//             svg.selectAll("circle")
//             .data(data)
//             .enter()
//             .append("circle")
//             .attr("cx", function (d) { 
//                 //console.log(projection([d["long"],d["lat"]])); 
//                 return projection([d["long"],d["lat"]])[0]; 
//             })
//             .attr("cy", function (d) { return projection([d["long"],d["lat"]])[1]; })
//             .attr("r", "2px")
//             .attr("fill", "red")
//             .on("click", function(d, i){
//                 console.log(d)
//             });

//         }
//     });
// });

function reload(){
    console.log("reloading");
    d3.select("bdy").selectAll("*").remove();
    d3.json("data/Abila.json", function(error, topo) {
        console.log(topo);
        abilafeatures = topojson.feature(topo, topo.objects["Abila"]).features
        var geoData = topojson.feature(topo, {
            type:"GeometryCollection",
            geometries: topo.objects["Abila"].geometries,
          })
        console.log(geoData)
        var projection = d3.geoMercator().fitSize([width, height], geoData)
        var path = d3.geoPath().projection(projection);
        var svg = d3.select("bdy").append("svg")
                        .attr("width", width)
                        .attr("height", height);
        svg.selectAll("path")
            .data(geoData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("stroke", "steelblue")
            //.attr("cx", function (d) { console.log(projection(d)); return projection(d)[0]; })
            .on("click", function(d, i){
                console.log(d)
            });
        //add circles to svg
        var data;
        Papa.parse('data/fullgpsedited.csv',{
            header: true,
            download: true,
            dynamicTyping: true,
            complete: function(results){
                console.log(results);
                data = results.data;
                res = []
                dayfilter = document.getElementById("Day").value;
                IDfilter = document.getElementById("ID").value;
                for(i in data){
                    //console.log(data[i])
                    if(dayfilter == data[i]["Date"] && IDfilter == data[i]["id"]){
                        console.log("yea")
                        res.push(data[i])
                    }
                }
                console.log("finished for loop");
                console.log(res);
                svg.selectAll("circle")
                .data(res)
                .enter()
                .append("circle")
                .attr("cx", function (d) { 
                    //console.log(projection([d["long"],d["lat"]])); 
                    return projection([d["long"],d["lat"]])[0]; 
                })
                .attr("cy", function (d) { return projection([d["long"],d["lat"]])[1]; })
                .attr("r", "2px")
                .attr("fill", "red")
                .on("click", function(d, i){
                    console.log(d)
                });
    
            }
        });
    });
}