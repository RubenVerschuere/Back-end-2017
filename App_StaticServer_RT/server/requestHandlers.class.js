//RequestHandlers.class.js
"use strict";

const fs = require("fs"),
    path = require("path"),
    config = require("../config");

//to do : test export
class RequestHandlers {
    constructor() { }

    static getFile(fileName, callback) {

        //fs.access
        fs.stat(fileName, function (err, stats) {
            if (stats && stats.isFile()) {
                callback(null, fs.createReadStream(fileName));
            } else {
                //ERROR CONTROLE 
                callback(new Error("De file bestaat niet"), null);
            }
        });
    }


    static api_getProducts(location, cb) {
        const pathProductsJSON = path.join(config.PROJECT_DIR, path.normalize('resources/data/Products.json' ) )
        let productsJSON = require(pathProductsJSON);

        productsJSON.filter((element, index, array) => {
            if (element.location == location) {
                //cb(null, element.products); //beter een stream aanmaken
                let Readable = require("stream").Readable;
                let sr = new Readable();
                sr.push(JSON.stringify(element.products));
                sr.push(null);
                cb(null, sr);
            }
        });


    }

   // static getAPIFlickrData(, cb) { }
}


module.exports = RequestHandlers;