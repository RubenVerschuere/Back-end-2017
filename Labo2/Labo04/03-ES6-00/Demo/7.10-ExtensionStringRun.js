'use strict';

let extension = require("./7.10-ExtensionString");

"Johan".encodeBase64(function(error, result){
    console.log("encoded in base64: " ,result);
    result.decodeBase64((err, result) => {
        console.log("decoded naar ascii:", result)
    });
});

"Johan".encrypt(function (error, result) {
    console.log("encrypted in base64: ", result);
});


setTimeout(() => { process.exit();   }  ,10000 )