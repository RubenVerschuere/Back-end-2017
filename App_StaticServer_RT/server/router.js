//router.js 
"use strict";
const path = require("path"),
    url = require("url"), //parsing 
    querystring = require("querystring"), //object parsing
    RequestHandlers = require("./RequestHandlers.class"),
    fs = require("fs");

let router = (function () {
    let _staticFolder;
    let setStaticFolder = (value) => { _staticFolder = value; };
    let getStaticFolder = () => { return _staticFolder; };

    let extensions = {
        ".txt":"tetx/plain", 
        ".html": "text/html",
        ".css": "text/css",
        ".js": "application/javascript",
        ".png": "image/png",
        ".gif": "image/gif",
        ".jpg": "image/jpeg",
        ".mp4": "video/mp4",
        ".json": "application/json ",
        ".ico": "image/x-icon"
    };

    let init = function (req, res, callback) {
        //1. haal de extensie op
        if (req.url === "/") { req.url = "index.html"; }
        let ext = path.extname(path.basename(req.url)),
            qs = url.parse(req.url).query,
            fileName = path.normalize(_staticFolder + "/" + req.url);

        //eigen API's 
        let getAPI=  (pathname, cb) => {
            switch (pathname.split("/")[2]) {
                case "products":
                    RequestHandlers.api_getProducts(pathname.split("/")[3], (err,data) => {
                        cb(null, data, ".json"); 
                    });
                    break;
                default: 
                    break ;

            } 

        }

        fs.stat(fileName, (err, stats) => {
            if (stats && stats.isFile()) {
                //file ophalen

                //2. roep de gepaste handler op
                if (req.method == "GET") {
                    //2.1 Indien querystring:
                    if (qs) {
                        let ext = path.extname(path.basename(fileName));
                        switch (ext) {
                            case ".mp4":
                                fileName = "resources/videos/" + qs.split("=")[1];
                                break;
                            case ".js" || ".png" || ".gif":
                                fileName = "resources/images/" + qs.split("=")[1];
                                break;
                            default:
                        }
                    }
                    //2.2 Handler ophalen
                    RequestHandlers.getFile(fileName, (error, rs) => {
                        if (error) {
                            callback(error, null);
                        } else {
                            callback(null, rs, extensions[ext]);
                        }
                    });

                }
                else {
                    console.log("No handler available yet for " + req.url);
                }


            }
            else if (req.url.split("/")[1] === "api") {
                //api of iets anders
                console.log("Dit is een api");
                getAPI(req.url, (err, data, ext) => {
                    callback(err, data, extensions[ext])
                })
            }
        })
    };

    return { init, setStaticFolder };

})();

module.exports = router;