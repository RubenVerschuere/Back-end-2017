    /**********************************************************************
    *   HTTP client stuurt formdata naar server van 072-HTTPServerPOST
    *   Node ondervraagt via een POST request.
    *
    *    de formdata wordt naar json (stringify) omgezet om via de query string te versturen
    /**********************************************************************/


const http = require('http'),
   qs = require('querystring');

let formData = qs.stringify({
    hogeschool: "HOWEST",
    naamCompleet: ["Johan", "VanHowest"],
    "naam[voornaam]": "johan",
    "naam[achternaam]": "vanNMCT"
});

let request = http.request({
    //options
    hostname: "localhost",
    port: 8080,
    path: "/",
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(formData)
    }
}, (response) => {
    //callback
    process.stdout.write("Server bevestigt:\n")
    response.on("data", function (data) {      
            process.stdout.write(data);
        });
});

//verzenden van formData
request.end(formData);

    //verhinderen dat de console direct sluit.
setTimeout(function () {
    process.exit();
}, 15000); 