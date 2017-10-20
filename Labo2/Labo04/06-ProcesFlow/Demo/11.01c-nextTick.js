/*
* nextTick kan een oplossing bieden om een synchrone functie asynchroon te maken.
* Vergeet wel de RETURN niet, om zeker als eerste uit de evevntloop te komen.
*/

const fs = require("fs");
//definiëren
let getFileSize = (fileName, cb) => {
    //validering eerst, niet binnen fs.stat 
    //door toevoegen van nextTick wordt het asynchroon (komt als eerste op eventloop)
    if (typeof (fileName) !== 'string') {
        //process.nextTick(cb, (new TypeError('fileName is not a string')));
        ////ok: maak async met process.nextTick en return (=afgewerkt) het resultaat
        return process.nextTick(cb, (new TypeError('fileName is not a string')));
    }

    fs.stat(fileName, (err, stats) => {
        //hier houdt fs error  dit (zonder return) tegen
        if (err || typeof (fileName) !== 'string') {
            return cb("fs error:\n" + err, null);
        } else {
            cb(null, stats.size);
        }
    });



};

//runnen 
let fileName = './00.Data/Products.json';
fileName = 1;
getFileSize(fileName, (err, fileSize) => {
    if (err) { console.log("FILE ERROR:\n"); throw err; };
    console.log(` De fileSize bedraagt ${fileSize}KB.  `);
});


console.log("hello als sync test"); //moet eerst komen tenzij een andere sync instructie 