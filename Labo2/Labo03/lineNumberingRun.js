//running de LineNumbering ;
"use strict"

const LineNumbering = require("./LineNumbering");

let fileName = "../MyTextfile.txt";
let lineNumbering = new LineNumbering(fileName);

lineNumbering.getNumberedText((err, results) => {
    for(let line of results){
        console.log(line);
    }
})