/*
 * 
 * Een CPU intensieve taak , niet op de queue , blokkeert de volgende taken (single thread)
 * Een CPU intensieve taak opsplitsen in de queue laat andere taken ertussen door.
 * Een CPU intensieve taak forken, splits de taak over processen.
 * 
 * 
 */


var index = 0;
var start = new Date();

//kleine taak op de eventqueue:
setInterval(function () {
    console.log(" ************** Komt pas later aan de beurt , na 5 'long processes' ******************************");
}, 500);

//CPU intensieve taak simuleren:
let task = (cb) => {
    var start = new Date();
    console.log("Simulating long process");
    //for (var j = 0; j < 100000000; j++) {              
    //    // Simulate large loop
    //}

    while (new Date() - start < 1000) { };
    cb("Oef! Finished!");
}

//aantal keer (of blijvend) uitvoeren van een CPU intensieve taak.


let longProcess = (task, num) => {
    if (num <= 0) return  //stop uitvoer
    console.log("uitvoer ", num, " :")
    task((text) => { console.log(text) }); //één keer uitvoeren

    //onderbreek hier tijdelijk na bvb 5 iteraties 
    if (num % 5 === 0) {
        //tweede actie: timeout plaatst process  met tussenpauzen op eventloop
        setTimeout(() => {
            longProcess(task, --num), 600
        })

    } else {

        //setTimeout( ()=> {
        longProcess(task, --num)
        //})
    }
}

let num = 29;
longProcess(task, num);