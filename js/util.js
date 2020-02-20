var idFilter = new Set()
var checkContainer = document.getElementById('ids');
var minDay = 6;
var maxDay = 8;
var minHour = 1;
var maxHour = 24;
checkContainer.addEventListener('click', filterUpdate);
function filterUpdate(e){
    /*console.log("list changing")*/
    ch = checkContainer.querySelectorAll('input');
    //console.log(ch)
    idFilter = new Set()
    for(var i = 0; i < ch.length; i++){
        if(ch[i].checked){
            /*console.log(ch[i].id)*/
            idFilter.add(parseInt(ch[i].id))
        }  
    }
    /*console.log(idFilter)*/
    drawGPS();
    updateNetworkOpacity();
    drawBar(idFilter);
}

var slider = document.getElementById('slider');
noUiSlider.create(slider, {
    start: [6,8],
    connect: true,
    range:{
        'min':6,
        'max':19
    },
    step: 1,
    behaviour:'drag',
    tooltips:true

});

slider.noUiSlider.on('update', updateDayFilter);
function updateDayFilter(){
    /*console.log("day slider changed");*/
    minDay = parseInt(slider.noUiSlider.get()[0]);
    maxDay = parseInt(slider.noUiSlider.get()[1]);
    drawGPS();
    drawGraph();
}

var slider1 = document.getElementById('slider1');
noUiSlider.create(slider1, {
    start: [0,24],
    connect: true,
    range:{
        'min':0,
        'max':24
    },
    step: 1,
    behaviour:'drag',
    tooltips:true
});

slider1.noUiSlider.on('update', updateTimeFilter);
function updateTimeFilter(){
    /*console.log("time slider changed");*/
    minHour = parseInt(slider1.noUiSlider.get()[0]);
    maxHour = parseInt(slider1.noUiSlider.get()[1]);
    /*console.log(minHour, maxHour)*/
    drawGPS();
    drawGraph();
};

function papaPromiseGPS(path){
    return new Promise(function(resolve, reject){
        Papa.parse(path,{
            header: true,
            download: true,
            dynamicTyping: true,
            complete: function(results){
                res = {}
                for(i in results.data){
                    var id = parseInt(results.data[i]["id"])
                    if(id in res){
                        res[id].push(results.data[i])
                    }else{
                        res[id] = []
                        res[id].push(results.data[i])
                    }
                }
                //console.log(res)
                resolve(res)
            },
            error(err){
                reject(err)
            }
            
        })
    });
};

function papaPromise(path){
    return new Promise(function(resolve, reject){
        Papa.parse(path,{
            header: true,
            download: true,
            dynamicTyping: true,
            complete: function(results){
                //console.log(res)
                resolve(results.data)
            },
            error(err){
                reject(err)
            }
            
        })
    });
};

function filterGPS(data){
    var day;
    var filter = []
    //console.log(data)
    //console.log(idFilter)
    for(let id of idFilter.keys()){
        //var id = idFilter[ids]
        //console.log(id)
        for(i in data[id]){
            //console.log(data[i])
            //if (i < 20){console.log(data[i]["Timestamp"])}
            if (data[id][i]['Timestamp']){
                day = parseInt(data[id][i]["Timestamp"].split(" ")[0].split('/')[1])

                // id = parseInt(data[id][i]["id"])
                time = parseInt(data[id][i]["Timestamp"].split(" ")[1].split(":")[0])
                //data[i]["Time"].split(" ")[1] == "PM" && time != 12? time += 12:time
                //console.log(time)
                //if(time>12){console.log(time, data[i]["Time"])}

                if(day >= minDay && day <= maxDay && time >= minHour && time <= maxHour){
                    filter.push(data[id][i]);
                }
            }  
        }
    }
    /*console.log("filter data length: ", filter.length)*/
    //console.log(filter)
    return filter
}