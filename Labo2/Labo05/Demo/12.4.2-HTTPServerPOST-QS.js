/* Server parst formdata met querystring module: qs.parse(formData) */

var http = require('http');
var qs = require('querystring');
var fs = require('fs');

var server = http.createServer(function (req, res) {    
    var formData = "";
    //req.pipe(res, { end: true }); //NOK
    
    
    //formdata ophalen en naar console schrijven (binair)
    req.on("data", function (data) {
         formData += data;
        console.log("following data received : \n " , data);
     
    });
    
    //formdata uitschrijven in de response stream van de client (console)
    req.on("end", function () {
        res.write("Hallo  \n");
        
        var formResult = qs.parse(formData);
        for (var d in formResult) {
          res.write(d.toString().toUpperCase() + " = " + formResult[d].toString().toUpperCase() + "\n");

        }
        
        
        ////var readStream = fs.createReadStream(formResult.toString());     
        ////readStream.pipe(res, { end: false}); // NOK?

        if (req.method === "GET" && path[1] === "sayHello") {
            res.end(); // verzenden
            formData = "";
        }
        res.end();

    });
    
  
});


server.listen(8080);
console.log("Server running on port 8080.");