var barPromise;
var width1 = 700;
var height1 = 400;
var colorList=["#1b70fc", "#d50527", "#158940", "#f898fd", "#24c9d7", "#cb9b64", "#866888", "#22e67a", "#e509ae", "#9dabfa", "#437e8a", "#b21bff", "#ff7b91", "#94aa05", "#ac5906", "#82a68d", "#fe6616", "#7a7352", "#f9bc0f", "#b65d66", "#07a2e6", "#c091ae", "#8a91a7", "#88fc07", "#ea42fe", "#9e8010", "#10b437", "#c281fe", "#f92b75", "#07c99d", "#a946aa", "#bfd544", "#16977e", "#ff6ac8", "#a88178", "#5776a9", "#678007", "#fa9316", "#85c070", "#6aa2a9", "#989e5d", "#fe9169", "#cd714a", "#6ed014", "#c5639c", "#c23271", "#698ffc", "#678275", "#c5a121", "#a978ba", "#ee534e", "#d24506", "#59c3fa", "#ca7b0a", "#6f7385", "#9a634a", "#48aa6f", "#ad9ad0", "#d7908c", "#6a8a53", "#8c46fc", "#8f5ab8", "#fd1105", "#7ea7cf", "#d77cd1", "#a9804b", "#0688b4", "#6a9f3e", "#ee8fba", "#a67389", "#9e8cfe", "#bd443c", "#6d63ff", "#d110d5", "#798cc3", "#df5f83", "#b1b853", "#bb59d8", "#1d960c", "#867ba8", "#18acc9", "#25b3a7", "#f3db1d", "#938c6d", "#936a24", "#a964fb", "#92e460", "#a05787", "#9c87a0", "#20c773", "#8b696d", "#78762d", "#e154c6", "#40835f", "#d73656", "#1afd5c", "#c4f546", "#3d88d8", "#bd3896", "#1397a3", "#f940a5", "#66aeff", "#d097e7", "#fe6ef9", "#d86507", "#8b900a", "#d47270", "#e8ac48", "#cf7c97", "#cebb11", "#718a90", "#e78139", "#ff7463", "#bea1fd"]
const color=d3.scaleOrdinal(colorList)

function drawBar(filterSet){

  var barElem = document.getElementById("bargraph")
  if (barElem) { barElem.remove() }

  // This will sort of work but you'll need to do some more
  // work to get it in the array of objects that you want
  d3.csv('data/employee_loc.csv')
  .then(function(data) {
      var dataByLocation = data.reduce((memo, item) => {
        if (!item) return memo;

        if (memo[item.location]) {
          memo[item.location] = memo[item.location].concat(item)
        } else { memo[item.location] = [item] }
        return memo
      }, {})
      /*console.log(dataByLocation)*/
  });

var employeeList={'1':"Lucas Alcazar", '2':"Lars Azada", '3':"Felix Balas", '4':"Ingrid Barranco", '5':"Isak Baza", '6':"Linnea Bergen", '7':"Isande Borrasca", '8':"Nils Calixto", '9':"Axel Calzas", '10':"Ada Campo-Corrente", '11':"Gustav Cazar", '12':"Hideki Cocinaro", '13':"Inga Ferro", '14':"Lidelse Dedos", '15':"Loreto Bodrogi", '16':"Isia Vann", '17':"Sven Flecha", '18':"Birgitta Frente", '19':"Vira Frente", '20':"Stenig Fusil", '21':"Hennie Osvaldo", '22':"Kanon Herrero", '23':"Varja Lagos", '24':"Minke Mies", '25':"Adra Nubarron", '26':"Marin Onda", '27':"Kare Orilla", '28':"Elsa Orilla", '29':"Bertrand Ovan", '30':"Felix Resumir", '31':"Sten Sanjorge Jr.", '32':"Orhan Strum", '33':"Brand Tempestad", '34':"Edvard Vann", '35':"Willem Vasco-Pais", '206':"Adan Morlun", '201':"Albina Hafon", '202':"Benito Hawelon", '207':"Cecilia Morluniau", '203':"Claudio Hawelon", '209':"Dylan Scozzese", '204':"Henk Mies", '208':"Irene Nant", '205':"Valeria Morlun", '101':"Truck 1", '104':"Truck 2", '105':"Truck 3", '106':"Truck 4", '107':"Truck 5"}

const groupData2=[{key: "Abila Airport", values:[{grpName:'209', grpValue: 11310.69}, {grpName:'204', grpValue: 35993.68}, {grpName:'203', grpValue: 4039.36}, {grpName:'202', grpValue: 7875.12}, {grpName:'201', grpValue: 8934.61}]},
{key: "Abila Scrapyard", values:[{grpName:'209', grpValue: 9482.09}]},
{key: "Abila Zacharo", values:[{grpName:'3', grpValue: 100.82}, {grpName:'26', grpValue: 101.79}, {grpName:'1', grpValue: 106.00}, {grpName:'4', grpValue: 106.31}, {grpName:'32', grpValue: 111.93}, {grpName:'12', grpValue: 114.13}, {grpName:'7', grpValue: 115.13}, {grpName:'15', grpValue: 116.32}, {grpName:'30', grpValue: 132.28}, {grpName:'13', grpValue: 134.06}, {grpName:'25', grpValue: 14.51}, {grpName:'31', grpValue: 15.95}, {grpName:'18', grpValue: 16.2}, {grpName:'16', grpValue: 171.72}, {grpName:'5', grpValue: 195.58}, {grpName:'17', grpValue: 20.44}, {grpName:'22', grpValue: 227.74}, {grpName:'24', grpValue: 24.87}, {grpName:'11', grpValue: 27.3}, {grpName:'2', grpValue: 27.93}, {grpName:'14', grpValue: 28.95}, {grpName:'8', grpValue: 31.00}, {grpName:'33', grpValue: 37.73}, {grpName:'21', grpValue: 38.41}, {grpName:'27', grpValue: 40.65}, {grpName:'35', grpValue: 45.45}, {grpName:'6', grpValue: 50.47}, {grpName:'29', grpValue: 65.11}, {grpName:'10', grpValue: 68.78}, {grpName:'23', grpValue: 8.16}, {grpName:'20', grpValue: 88.36}, {grpName:'34', grpValue: 90.56}]},
{key: "Ahaggo Museum", values:[{grpName:'17', grpValue: 120.2}, {grpName:'30', grpValue: 120.2}, {grpName:'28', grpValue: 26.91}, {grpName:'33', grpValue: 52.14}, {grpName:'22', grpValue: 55.55}, {grpName:'34', grpValue: 89.32}]},
{key: "Albert's Fine Clothing", values:[{grpName:'10', grpValue: 229.98}, {grpName:'7', grpValue: 254.29}, {grpName:'1', grpValue: 276.9}, {grpName:'4', grpValue: 288.00}, {grpName:'32', grpValue: 331.82}, {grpName:'24', grpValue: 333.23}, {grpName:'3', grpValue: 364.73}, {grpName:'19', grpValue: 470.15}, {grpName:'25', grpValue: 470.47}, {grpName:'23', grpValue: 50.77}, {grpName:'9', grpValue: 63.36}, {grpName:'11', grpValue: 88.89}, {grpName:'13', grpValue: 91.71}]},
{key: "Bean There Done That", values:[{grpName:'14', grpValue: 10.37}, {grpName:'19', grpValue: 122.72}, {grpName:'18', grpValue: 15.24}, {grpName:'2', grpValue: 162.07}, {grpName:'3', grpValue: 175.35}, {grpName:'9', grpValue: 240.33}, {grpName:'11', grpValue: 351.81}]},
{key: "Brew've Been Served", values:[{grpName:'20', grpValue: 108.22}, {grpName:'24', grpValue: 126.92}, {grpName:'21', grpValue: 138.94}, {grpName:'22', grpValue: 147.32}, {grpName:'30', grpValue: 154.37}, {grpName:'17', grpValue: 181.34}, {grpName:'34', grpValue: 205.55}, {grpName:'16', grpValue: 206.12}, {grpName:'33', grpValue: 333.31}, {grpName:'23', grpValue: 398.54}, {grpName:'13', grpValue: 96.25}, {grpName:'15', grpValue: 96.55}]},
{key: "Brewed Awakenings", values:[{grpName:'10', grpValue: 101.27}, {grpName:'4', grpValue: 111.1}, {grpName:'7', grpValue: 371.67}, {grpName:'15', grpValue: 64.84}]},
{key: "Carlyle Chemical Inc.", values:[{grpName:'203', grpValue: 227.81}, {grpName:'205', grpValue: 32144.88}, {grpName:'201', grpValue: 5678.62}, {grpName:'208', grpValue: 5716.34}]},
{key: "Chostus Hotel", values:[{grpName:'33', grpValue: 472.44}, {grpName:'7', grpValue: 574.08}, {grpName:'31', grpValue: 600.00}]},
{key: "Coffee Cameleon", values:[{grpName:'25', grpValue: 114.03}, {grpName:'6', grpValue: 116.77}, {grpName:'24', grpValue: 14.99}, {grpName:'29', grpValue: 182.94}, {grpName:'20', grpValue: 9.16}]},
{key: "Daily Dealz", values:[{grpName:'1', grpValue: 2.01}]},
{key: "Desafio Golf Course", values:[{grpName:'31', grpValue: 148.22}, {grpName:'32', grpValue: 150.07}, {grpName:'35', grpValue: 239.35}, {grpName:'4', grpValue: 366.49}, {grpName:'10', grpValue: 389.37}]},
{key: "Frank's Fuel", values:[{grpName:'3', grpValue: 52.66}, {grpName:'15', grpValue: 65.34}]},
{key: "Frydos Autosupply n' More", values:[{grpName:'1', grpValue: 10000.00}, {grpName:'9', grpValue: 103.55}, {grpName:'29', grpValue: 114.98}, {grpName:'11', grpValue: 120.65}, {grpName:'35', grpValue: 120.67}, {grpName:'7', grpValue: 18.91}, {grpName:'23', grpValue: 194.11}, {grpName:'25', grpValue: 197.32}, {grpName:'34', grpValue: 209.76}, {grpName:'33', grpValue: 235.27}, {grpName:'17', grpValue: 237.08}, {grpName:'16', grpValue: 260.08}, {grpName:'28', grpValue: 273.87}, {grpName:'26', grpValue: 314.98}, {grpName:'24', grpValue: 42.72}, {grpName:'14', grpValue: 433.57}, {grpName:'15', grpValue: 459.31}, {grpName:'4', grpValue: 52.73}, {grpName:'30', grpValue: 751.71}, {grpName:'21', grpValue: 98.04}, {grpName:'8', grpValue: 98.39}]},
{key: "Gelatogalore", values:[{grpName:'24', grpValue: 10.62}, {grpName:'14', grpValue: 104.17}, {grpName:'22', grpValue: 106.65}, {grpName:'23', grpValue: 119.75}, {grpName:'18', grpValue: 17.31}, {grpName:'1', grpValue: 21.52}, {grpName:'13', grpValue: 214.12}, {grpName:'19', grpValue: 22.36}, {grpName:'3', grpValue: 23.23}, {grpName:'34', grpValue: 23.45}, {grpName:'17', grpValue: 27.26}, {grpName:'25', grpValue: 32.82}, {grpName:'6', grpValue: 46.78}, {grpName:'32', grpValue: 48.67}, {grpName:'15', grpValue: 49.95}, {grpName:'7', grpValue: 56.74}, {grpName:'8', grpValue: 57.93}, {grpName:'27', grpValue: 57.95}, {grpName:'2', grpValue: 63.08}, {grpName:'35', grpValue: 70.09}, {grpName:'9', grpValue: 70.98}, {grpName:'21', grpValue: 72.06}, {grpName:'5', grpValue: 8.6}, {grpName:'10', grpValue: 81.51}, {grpName:'26', grpValue: 88.94}, {grpName:'29', grpValue: 88.97}]},
{key: "General Grocer", values:[{grpName:'30', grpValue: 108.49}, {grpName:'13', grpValue: 126.2}, {grpName:'29', grpValue: 177.6}, {grpName:'24', grpValue: 227.28}, {grpName:'34', grpValue: 285.34}, {grpName:'12', grpValue: 363.87}, {grpName:'19', grpValue: 70.22}]},
{key: "Guy's Gyros", values:[{grpName:'1', grpValue: 10.27}, {grpName:'26', grpValue: 11.22}, {grpName:'2', grpValue: 117.99}, {grpName:'35', grpValue: 128.92}, {grpName:'18', grpValue: 139.3}, {grpName:'13', grpValue: 145.85}, {grpName:'29', grpValue: 17.44}, {grpName:'34', grpValue: 171.56}, {grpName:'24', grpValue: 190.51}, {grpName:'22', grpValue: 207.45}, {grpName:'30', grpValue: 225.41}, {grpName:'31', grpValue: 25.79}, {grpName:'7', grpValue: 27.49}, {grpName:'33', grpValue: 289.00}, {grpName:'11', grpValue: 31.05}, {grpName:'9', grpValue: 32.8}, {grpName:'12', grpValue: 353.09}, {grpName:'15', grpValue: 378.69}, {grpName:'6', grpValue: 39.27}, {grpName:'23', grpValue: 416.99}, {grpName:'17', grpValue: 448.61}, {grpName:'16', grpValue: 454.52}, {grpName:'25', grpValue: 53.26}, {grpName:'8', grpValue: 53.3}, {grpName:'20', grpValue: 561.92}, {grpName:'14', grpValue: 59.61}, {grpName:'32', grpValue: 66.01}, {grpName:'3', grpValue: 72.43}, {grpName:'4', grpValue: 8.64}]},
{key: "Hallowed Grounds", values:[{grpName:'21', grpValue: 128.71}, {grpName:'1', grpValue: 161.39}, {grpName:'18', grpValue: 173.31}, {grpName:'8', grpValue: 200.72}, {grpName:'12', grpValue: 213.46}, {grpName:'27', grpValue: 223.93}, {grpName:'26', grpValue: 80.94}, {grpName:'31', grpValue: 9.72}, {grpName:'14', grpValue: 95.65}]},
{key: "Hippokampos", values:[{grpName:'22', grpValue: 101.52}, {grpName:'6', grpValue: 104.86}, {grpName:'8', grpValue: 107.35}, {grpName:'14', grpValue: 12.57}, {grpName:'20', grpValue: 15.77}, {grpName:'18', grpValue: 163.37}, {grpName:'34', grpValue: 179.33}, {grpName:'33', grpValue: 179.45}, {grpName:'26', grpValue: 21.91}, {grpName:'1', grpValue: 246.15}, {grpName:'7', grpValue: 246.21}, {grpName:'24', grpValue: 304.48}, {grpName:'32', grpValue: 336.1}, {grpName:'9', grpValue: 337.32}, {grpName:'3', grpValue: 342.15}, {grpName:'11', grpValue: 343.67}, {grpName:'4', grpValue: 378.8}, {grpName:'10', grpValue: 445.49}, {grpName:'35', grpValue: 459.06}, {grpName:'5', grpValue: 49.17}, {grpName:'2', grpValue: 495.34}, {grpName:'19', grpValue: 509.47}, {grpName:'30', grpValue: 57.07}, {grpName:'15', grpValue: 70.76}, {grpName:'27', grpValue: 76.11}, {grpName:'16', grpValue: 78.08}, {grpName:'21', grpValue: 8.75}, {grpName:'17', grpValue: 91.97}, {grpName:'25', grpValue: 93.57}]},
{key: "Jack's Magical Beans", values:[{grpName:'5', grpValue: 110.62}, {grpName:'28', grpValue: 192.41}, {grpName:'35', grpValue: 208.85}, {grpName:'32', grpValue: 282.79}, {grpName:'15', grpValue: 6.00}]},
{key: "Kalami Kafenion", values:[{grpName:'28', grpValue: 101.5}, {grpName:'23', grpValue: 105.79}, {grpName:'12', grpValue: 136.01}, {grpName:'20', grpValue: 14.77}, {grpName:'6', grpValue: 140.78}, {grpName:'35', grpValue: 144.23}, {grpName:'10', grpValue: 15.15}, {grpName:'19', grpValue: 158.62}, {grpName:'3', grpValue: 179.9}, {grpName:'34', grpValue: 18.06}, {grpName:'32', grpValue: 22.39}, {grpName:'9', grpValue: 22.83}, {grpName:'13', grpValue: 23.86}, {grpName:'29', grpValue: 24.08}, {grpName:'17', grpValue: 27.00}, {grpName:'21', grpValue: 27.7}, {grpName:'16', grpValue: 31.96}, {grpName:'14', grpValue: 46.19}, {grpName:'24', grpValue: 46.61}, {grpName:'7', grpValue: 54.36}, {grpName:'11', grpValue: 61.54}, {grpName:'27', grpValue: 73.34}, {grpName:'30', grpValue: 82.18}, {grpName:'22', grpValue: 95.25}]},
{key: "Katerina's Café", values:[{grpName:'32', grpValue: 100.19}, {grpName:'12', grpValue: 100.56}, {grpName:'16', grpValue: 100.63}, {grpName:'24', grpValue: 106.59}, {grpName:'33', grpValue: 11.08}, {grpName:'19', grpValue: 121.79}, {grpName:'6', grpValue: 127.05}, {grpName:'10', grpValue: 13.68}, {grpName:'4', grpValue: 158.94}, {grpName:'23', grpValue: 176.38}, {grpName:'30', grpValue: 19.65}, {grpName:'205', grpValue: 198.81}, {grpName:'18', grpValue: 198.9}, {grpName:'27', grpValue: 281.65}, {grpName:'21', grpValue: 309.28}, {grpName:'9', grpValue: 35.06}, {grpName:'25', grpValue: 353.05}, {grpName:'14', grpValue: 359.16}, {grpName:'11', grpValue: 36.56}, {grpName:'26', grpValue: 403.91}, {grpName:'8', grpValue: 451.66}, {grpName:'5', grpValue: 53.24}, {grpName:'22', grpValue: 55.6}, {grpName:'7', grpValue: 57.36}, {grpName:'15', grpValue: 59.55}, {grpName:'29', grpValue: 706.48}, {grpName:'13', grpValue: 94.89}, {grpName:'34', grpValue: 99.32}]},
{key: "Kronos Mart", values:[{grpName:'10', grpValue: 150.36}, {grpName:'20', grpValue: 159.06}, {grpName:'1', grpValue: 194.51}, {grpName:'4', grpValue: 203.91}, {grpName:'32', grpValue: 277.26}, {grpName:'2', grpValue: 286.24}, {grpName:'12', grpValue: 298.83}, {grpName:'5', grpValue: 58.85}, {grpName:'23', grpValue: 87.66}]},
{key: "Kronos Pipe and Irrigation", values:[{grpName:'208', grpValue: 10523.57}, {grpName:'201', grpValue: 3134.95}]},
{key: "Maximum Iron and Steel", values:[{grpName:'208', grpValue: 12658.68}, {grpName:'201', grpValue: 3549.36}]},
{key: "Nationwide Refinery", values:[{grpName:'205', grpValue: 10170.56}, {grpName:'207', grpValue: 12066.4}, {grpName:'203', grpValue: 2302.73}, {grpName:'202', grpValue: 5899.72}, {grpName:'206', grpValue: 6416.93}, {grpName:'209', grpValue: 6641.84}]},
{key: "Octavio's Office Supplies", values:[{grpName:'20', grpValue: 131.73}, {grpName:'34', grpValue: 139.72}, {grpName:'6', grpValue: 64.51}]},
{key: "Ouzeri Elian", values:[{grpName:'12', grpValue: 118.05}, {grpName:'19', grpValue: 118.81}, {grpName:'2', grpValue: 14.01}, {grpName:'23', grpValue: 143.87}, {grpName:'201', grpValue: 19.82}, {grpName:'28', grpValue: 195.6}, {grpName:'21', grpValue: 20.46}, {grpName:'32', grpValue: 226.95}, {grpName:'1', grpValue: 230.32}, {grpName:'13', grpValue: 24.72}, {grpName:'4', grpValue: 26.09}, {grpName:'18', grpValue: 30.93}, {grpName:'7', grpValue: 38.9}, {grpName:'20', grpValue: 42.96}, {grpName:'9', grpValue: 45.00}, {grpName:'17', grpValue: 45.32}, {grpName:'25', grpValue: 47.37}, {grpName:'15', grpValue: 47.71}, {grpName:'5', grpValue: 504.48}, {grpName:'11', grpValue: 52.67}, {grpName:'29', grpValue: 56.62}, {grpName:'30', grpValue: 59.51}, {grpName:'22', grpValue: 62.2}, {grpName:'10', grpValue: 69.58}, {grpName:'6', grpValue: 8.93}, {grpName:'26', grpValue: 80.64}, {grpName:'34', grpValue: 95.03}]},
{key: "Roberts and Sons", values:[{grpName:'4', grpValue: 125.35}, {grpName:'24', grpValue: 155.76}, {grpName:'21', grpValue: 223.81}, {grpName:'26', grpValue: 256.24}, {grpName:'18', grpValue: 266.69}, {grpName:'16', grpValue: 481.86}, {grpName:'6', grpValue: 62.47}]},
{key: "Shoppers' Delight", values:[{grpName:'26', grpValue: 135.78}, {grpName:'30', grpValue: 144.4}, {grpName:'1', grpValue: 149.2}, {grpName:'18', grpValue: 157.45}, {grpName:'9', grpValue: 160.69}, {grpName:'10', grpValue: 162.00}, {grpName:'15', grpValue: 216.43}, {grpName:'32', grpValue: 258.33}, {grpName:'16', grpValue: 293.67}, {grpName:'25', grpValue: 30.39}, {grpName:'17', grpValue: 366.04}, {grpName:'22', grpValue: 392.39}, {grpName:'13', grpValue: 483.9}, {grpName:'29', grpValue: 51.5}]},
{key: "Stewart and Sons Fabrication", values:[{grpName:'209', grpValue: 1880.8}, {grpName:'207', grpValue: 24595.5}, {grpName:'202', grpValue: 3757.04}, {grpName:'203', grpValue: 4195.49}, {grpName:'206', grpValue: 6283.64}]},
{key: "U-Pump", values:[{grpName:'1', grpValue: 55.25}, {grpName:'23', grpValue: 59.51}]}];

  var groupData = []
  for(i in groupData2){
    var filterValues = Array.from(filterSet).map(filterVal => {
      var val = groupData2[i].values.filter(d => d.grpName == filterVal)
      if (val.length > 0) {
        return Object.assign(val[0], {grpName: parseInt(val[0].grpName)})
      } else { return {grpName: filterVal, grpValue: 0} }
    })

    if (filterValues.some(x => x.grpValue > 0)){
      groupData.push({key: groupData2[i].key, values: filterValues});
    }
  }

  var margin = {top: 0, right: 0, bottom: 0, left: 0};
  
 
  //var x0  = d3.scaleBand().rangeRound([0, width], 0.5).paddingInner(0.01);
  var x0  = d3.scaleBand().rangeRound([50, width1-50], 0.5).paddingInner(0.5);
  var x1  = d3.scaleBand();
  var y   = d3.scaleLinear().rangeRound([height1, height1-120]);

  var xAxis = d3.axisBottom().scale(x0)
                              //.tickFormat(d3.timeFormat("Week %V"))
                              .tickValues(groupData.map(d=>d.key))

  var yAxis = d3.axisLeft().scale(y);

  var svg = d3.select('#barChart').append("svg")
  .attr("width", width1 + margin.left + margin.right)
  .attr("height", height1 + margin.top + margin.bottom)
  .attr("id","bargraph")

  var categoriesNames = groupData.map(function(d) { return d.key; });
  var rateNames = groupData[0].values.map(function(d) { return d.grpName; });

  x0.domain(categoriesNames);
  x1.domain(rateNames).rangeRound([0, x0.bandwidth()]);
  y.domain([0, d3.max(groupData, function(key) { return d3.max(key.values, function(d) { return d.grpValue; }); })]);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (height1-120) + ")")
    .call(xAxis)
    .style("text-anchor", "end");


  svg.append("g")
    .attr("class", "y axis")
    /*.attr("transform", "translate(0," + -(120) + ")")*/
    .call(yAxis)
      .append("text")
      	.attr("transform", "rotate(-90)")
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .style('font-weight','bold')
          .style("text-anchor", "middle")
          .text("Value");

 

  var slice = svg.selectAll(".slice")
    .data(groupData)
    .enter().append("g")
    .attr("class", "g")
    .attr("transform",function(d) { return "translate(" + x0(d.key) + ",0)"; })
    .on("click", function(d) {
        loadLineChart(d.key);
    })


  slice.selectAll("rect")
  .data(function(d) { return d.values; })
    .enter().append("rect")
        .attr("width", x1.bandwidth())
        .attr("x", function(d) { return x1(d.grpName); })
         .style("fill", function(d) { return color(d.grpName) })
         .attr("y", function(d) { return y(0); })
         .attr("height", function(d) { return height1 - y(0); })
        


  slice.selectAll("rect")
    .transition()
    .delay(function (d) {return Math.random()*1000;})
    .duration(1000)
    .attr("y", function(d) { return y(d.grpValue); })
    .attr("height", function(d) { return height1 - y(d.grpValue); })
    .attr("transform", "translate(0, -120)");

      //Legend
  var legend = svg.selectAll(".legend")
      .data(groupData[0].values.map(function(d) { return d.grpName; }).reverse())
  .enter().append("g")
      .attr("class", "legend")
      .attr("dy","-100px")
      .attr("transform", function(d,i) { return "translate(-50," + (75+(i * 20)) + ")"; })
      .style("opacity","0");

  legend.append("rect")
      .attr("x", width1 - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", function(d) { return color(d); });

  legend.append("text")
      .attr("x", width1 - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) {return employeeList[d]; });

  legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");
    
}