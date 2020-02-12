const w = 600;
const h = 600;
let x = null;
let y = null;
let dataset = [];
var data;
Papa.parse('test.csv',{
    header: true,
    download: true,
    dynamicTyping: true,
    complete: function(results){
        console.log(results);
        data = results.data;
    }
});
//Create SVG element
// let svg = d3.select("body")
//             .append("svg")
//             .attr("width", w)
//             .attr("height", h);

var width = 950,
height = 550;

// set projection
var projection = d3.geoMercator();

// create path variable
var path = d3.geoPath()
    .projection(projection);

// var featureCollection = topojson.feature(currentMap, currentMap.objects.poly_bg);
// svg.append("g")
//     .selectAll("path")
//     .data(featureCollection.features)
//     .enter().append("path")
//     .attr("d", path);


d3.json("data/Abila.json", function(error, topo) {
    console.log(topo);
    abilafeatures = topojson.feature(topo, topo.objects.Abila).features
    // set projection parameters
    // projection
    //     .scale(.00001)
    //     .center([24, 37.5])

    var projection = d3.geoMercator()
      .fitSize([width, height], {type:"FeatureCollection", features: abilafeatures})
    var path = d3.geoPath()
      .projection(projection);
    //var path = d3.geoPath();
    // create svg variable
    var svg = d3.select("body").append("svg")
                    .attr("width", width)
                    .attr("height", height);

    // points
    aa = [-124, 37.786453];
    bb = [24, 37.72728];

    console.log(projection(aa),projection(bb));

    // add states from topojson
    svg.selectAll("path")
        .data(abilafeatures).enter()
        .append("path")
        .attr("class", "roads")
        .style("fill", "steelblue")
        .attr("d", path);

    //add circles to svg
    // svg.selectAll("circle")
    //     .data([aa,bb]).enter()
    //     .append("circle")
    //     .attr("cx", function (d) { console.log(projection(d)); return projection(d)[0]; })
    //     .attr("cy", function (d) { return projection(d)[1]; })
    //     .attr("r", "8px")
    //     .attr("fill", "red")
    
});