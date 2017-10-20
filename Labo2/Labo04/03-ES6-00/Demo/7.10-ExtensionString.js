
/*
*  Aanmaken van (asynchrone) extensie methoden via het prototype 
*  decoderen naar Base64 (= van binair naar ASCII)
*/

"use strict";
String.prototype.encodeBase64 = (function () {
    let encode = function (cb) {
        console.log("this :", this);//gn arrow functie (this wordt anders {} )

        let bufferString = Buffer.from(this, 'utf-8').toString('base64'); //default unicode
        cb(null, bufferString);
    };
   return encode;
})();

String.prototype.decodeBase64 = (function () {
    let decode = function (cb) {
        console.log("this :", this);//gn arrow functie (this wordt anders {} )
        let bufferString = Buffer.from(this,'base64').toString('ascii');
        cb(null, bufferString);
    };
    return decode;
})();

String.prototype.encrypt = (function () {
    let encrypt = function (cb) {
        let bufferString = Buffer.from(this, 'base64'); //default unicode
        cb(null, bufferString.reduce((a, b) => a.toString() + b.toString()));
     };
    return encrypt;
})();