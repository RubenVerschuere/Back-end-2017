//RequestHandlers.class.js
"use strict"

const fs = require("fs"),
      path = require("path"),
      config = require("../config");
    

class requestHandlers {
    constructor(){

    }

    static getFile(fileName, cb){
        fs.stat(fileName, function(err, stats){
            if(stats && stats.isFile()){
                cb(null, fs.createReadStream(fileName))
            }
            else 
            {
                cb(new Error("De file bestaat niet"));
            }
        })
    }

    static getFilePromises(fileName){
        var p = new Promise((result, reject) => {
            fs.stat(fileName, function(err, stats){
                if(stats && stats.isFile()){
                    result(fs.createReadStream(fileName));
                }
                else 
                {
                    reject("De file bestaat niet");
                }
            })
        });

        return p;
    }
}

module.exports = requestHandlers;