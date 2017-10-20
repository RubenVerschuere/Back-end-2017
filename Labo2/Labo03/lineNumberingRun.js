//running de LineNumbering ;
"use strict"

const path = require("path");
//const config = require("../../config.js");
const LineNumbering = require("./LineNumbering");

let fileName = "../MyTextfile.txt";
//fileName = path.join(config.PROJECT_DIR, path.normalize("MyTextfile.txt")); //project dir wordt aangepast wanneer gij op de server staat
let lineNumbering = new LineNumbering(fileName);

lineNumbering.getNumberedText((err, results) => {
    for(let line of results){
        console.log(line);
    }
})