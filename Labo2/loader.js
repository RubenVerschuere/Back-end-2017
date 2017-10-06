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
const loadAsync = (element, callback) => {
    if (element === "ERROR") {
        callback("Error", null)
    }
    else {
        setTimeout(function() {callback(null, element + "is loaded") }, 1000)
    }
    //return "element " + element + " loaded";
};

const loadArrayAsynchroon = (array, elements, callback) => {
    //ES6 for/of lus -> value return
    console.time("asynchrone laadtijd");
    let counter = 0;
    for (let element of elements) {
        loadAsync(element, function(err, element){
            ++counter;
            if(err) {
                users2[counter - 1] = err;
                callback(err, null);
                console.log(users2[counter-1]);
            }
            else {
                users2[counter -1] = element;
                console.log(users2[counter-1]);
                if(counter == usersIds.length){
                    callback(null, users2);
                    console.timeEnd("Asynchrone laadtijd for/of");
                }
            }
        })
    }
};

console.time("Asynchrone Laadtijd");//monitoren van synchrone doorlooptijd
loadArrayAsynchroon(users2, usersIds, function(err, result){
    if (err) { console.log(err) } else {
        console.log("Dit is de filled array:", result);
    }
});
console.timeEnd("Asynchrone Laadtijd");