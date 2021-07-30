"use strict";

let mapTimer = new Map;

// демонстрационные данные
let testArr = [
    // [1, "DOWN", "05.06.2021 21:00"],
    // [2, "UP", "02.07.2021 21:00"],
    // [3, "UP", "02.07.2021 21:00"],
    // [4, "DOWN", "02.07.2021 21:00"],
    // [5, "UP", "02.07.2021 21:00"],
    // [6, "UP", "02.07.2021 21:00"],
    // [7, "UP", "02.07.2021 21:00"],
    // [8, "UP", "02.07.2021 21:00"],
    // [9, "DOWN", "02.07.2021 21:00"],
    // [10, "UP", "02.07.2021 21:00"],
    // [11, "UP", "02.07.2021 21:00"],
    // [12, "UP", "02.07.2021 21:00"],
    // [13, "UP", "02.07.2021 21:00"],
    // [14, "DOWN", "02.07.2021 21:00"],
    // [15, "DOWN", "02.07.2021 21:00"],
    // [16, "UP", "02.07.2021 21:00"],
    // [17, "UP", "02.07.2021 21:00"],
    // [18, "UP", "02.07.2021 21:00"],
    // [19, "UP", "02.07.2021 21:00"],
    // [20, "UP", "02.07.2021 21:00"],
    // [21, "UP", "02.07.2021 21:00"],
    // [22, "DOWN", "02.07.2021 21:00"],
    // [23, "UP", "02.07.2021 21:00"],
    // [24, "UP", "02.07.2021 21:00"],
    // [25, "UP", "02.07.2021 21:00"],
    // [26, "UP", "02.07.2021 21:00"],
    // [27, "UP", "02.07.2021 21:00"],
    // [28, "UP", "02.07.2021 21:00"],
    // [29, "UP", "02.07.2021 21:00"],
]

for(let i = 1; i < 80; i++){
    let arr = [];
    arr.push(i);
    arr.push(Math.floor(Math.random() * 2) == 1 ? "UP" : "DOWN");
    arr.push(moment.now() - Math.floor(Math.random() * 360000000));
    testArr.push(arr);

}

console.log(testArr);


ajaxCall();

setInterval(ajaxCall, 180000);

setInterval(() => {
    mapTimer.forEach((value, key) => {
        let now = moment();
        let d = (now.diff(value, 'days'));
        let h = (now.diff(value, 'hours')%24);
        let m = (now.diff(value, 'minutes')%60);
        // let s = (now.diff(value, 'seconds')%60);
        let curDiffTime;
        if(key > 61) { curDiffTime = getDoubleCharacters(d) + 'д ' + getDoubleCharacters(h) + 
        ":" + getDoubleCharacters(m);}
        else { curDiffTime = getDoubleCharacters(d) + 'д ' + getDoubleCharacters(h) + 
        ":" + getDoubleCharacters(m);}
        let elem = document.getElementById(key).firstElementChild;
        elem.innerHTML = curDiffTime;
    });

}, 1000);

// console.log(mapTimer);

function setServiceStatus(block, status) {
    if(status == 'DOWN') {
        block.firstElementChild.classList.add('timer-down');
        block.firstElementChild.classList.remove('timer-up');
        block.lastElementChild.classList.add('stImg-down');
        block.lastElementChild.classList.remove('stImg-up');
    }
    else if(status == 'UP') {
        block.firstElementChild.classList.add('timer-up');
        block.firstElementChild.classList.remove('timer-down');
        block.lastElementChild.classList.add('stImg-up');
        block.lastElementChild.classList.remove('stImg-down');
    }
}

function setDeviceStatus(block, status, dayTimer) {
    if(status == 'DOWN' && dayTimer < 1) {
        block.classList.add('block-down-oneday');
        block.classList.remove('block-up');
        block.classList.remove('block-down');
    }
    else if(status == 'DOWN') {
        block.classList.add('block-down');
        block.classList.remove('block-up');
        block.classList.remove('block-down-oneday');
    }
    else if(status == 'UP') {
        block.classList.add('block-up');
        block.classList.remove('block-down');
        block.classList.remove('block-down-oneday');
    }
}

function getDoubleCharacters(mean) {
    if(mean < 10) return '0' + mean;
    else return mean;
}   





function ajaxCall() {
    // $.ajax({
    //     type: "POST",
    //     url: window.location,
    //     dataType: 'json',
    //     data: {type: 'getAlerts'},
    //     success: function(msg){
    //         console.log('Данные обновлены');
            
    //         if (msg['data'].length > 0) {
            
            if (testArr.length > 0) {

                for(let device of testArr){
                    let now = moment();
                    let timer = moment(device[2]);
                    // console.log(timer);
                    // mapTimer.set(device[0], timer);
                    let block = document.getElementById(device[0]);

                    if(!block) {
                        // console.log(device[0]);
                        continue;
                        
                    }
                    else if(device[0] > 75) {
                        setServiceStatus(block, device[1]);
                        mapTimer.set(device[0], timer);
                    }
                    else {
                        setDeviceStatus(block, device[1], now.diff(timer, 'days'));
                        mapTimer.set(device[0], timer);
                    }
        
                }
            
            }
        // }
    // });
    
}




