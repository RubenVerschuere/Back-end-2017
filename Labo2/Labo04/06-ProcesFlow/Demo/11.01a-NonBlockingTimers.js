/*
* Twee timers, één http server , volledig onafhankelijk van elkaar
* stilleggen van een proces na x seconden
*/

var http = require('http');
//01.multitask
setInterval(function () { console.log("Hello"); }, 2100);

const goo = setInterval(function () {
    http.get({
        host: "google.be"
    },
        function (response) {
            console.log(response.headers);
        }
    )

}, 1000);

console.log("Dit komt eerst op de console.");

//02.stilleggen
setTimeout(function () { clearInterval(goo) }, 7000); 