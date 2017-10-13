//Oefening 8.2 - lijnen nummeren en erven

"use strict"
var fs = require("fs");

class lineNumbering {

    constructor(filename){
        this._filename = filename;
    }


    sayHello() {
        console.log("Hallo");
    }

    readTextAsync(cb) {
        fs.readFile(this._filename, (err, data) => {
            if (err) {throw err; }
            cb(null, data.toString('utf-8'));
        } )
    }

    getNumberedText(cb) {
        let results = [];
        this.readTextAsync((err, text) => {
            let lines = text.split('\n');
            lines.forEach(function (line , index) {
            // results[index] = "lijn" + index + ". " + line;
            results[index] = `lijn ${index}. ${line}`;
            //vul aan en toon het resultaat in de console
            //je kan nummeren via een index
            })            
        return cb(null, results);
        })
    }
}

module.exports = lineNumbering;