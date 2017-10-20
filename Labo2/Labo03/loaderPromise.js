"use strict";

let users = []; //op te laden target Array
let usersIds = ["P1", "P2", "P3", "P4", "ERROR", "P6", "P7", "P8", "P9"];//source
let delay = 200;
const sleep = (time) => {
    var start = new Date().getTime();
    while (new Date().getTime() - start < time) {
        //just wait in a synchronuous while
    }
}

const loadSync = (element) => {
    sleep(delay);
    return "element " + element + " loaded";
};
const loadArraySynchroon = (array, elements) => {
    //ES6 for/of lus -> value return
    for (let element of elements) {
        array[element] = loadSync(element);
        console.log(array[element]); // informatie wanneer ingeladen
    }
};
console.time("Synchrone Laadtijd");//monitoren van synchrone doorlooptijd
loadArraySynchroon(users, usersIds);
console.timeEnd("Synchrone Laadtijd");




//BOVENSTAANDE CODE ASYNC MAKEN!!!

let users2 = [];
const loadAsync = (element) => {
    return new Promise((resolve, reject)=> {
        if(element == "ERROR"){
            reject('Nope')
        } 
        else {
            setTimeout(()=> {resolve(element + "is loaded") }, Math.random() * 1000)
        }
    })
    //return "element " + element + " loaded";
};

const loadArrayAsynchroon = (array, elements) => {
    //ES6 for/of lus -> value return
    let start_time = new Date().getTime();
    console.time("laadtijd met Promise")
    return new Promise((resolve, reject) => {
        let index = 0;
        for (let element of elements) {
            console.time(element + "laadtijd");
            loadAsync(element)
                .then(result => {
                    users2.push(element + "na");
                    console.timeEnd(element + "laadtijd");
                    if (++index === elements.length) {
                        resolve(users2)
                    }
                }, error => {
                    ++index;
                    console.timeEnd(element + "laadtijd");
                    users2.push("FOUT:" + element);
                    return;
                });
        }
    })
};

console.time("Promise Laadtijd");//monitoren van synchrone doorlooptijd
loadArrayAsynchroon(users2, usersIds)
.then((result) => {
    console.log("dit is de filled array:", result);
    console.timeEnd("Promise Laadtijd");
}, (error) => {
    console.log(error);
    return (null);
})
