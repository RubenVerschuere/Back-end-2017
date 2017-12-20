//router.js

"use strict"
const path = require("path"),
      RequestHandlers = require("./requestHandlers.class");

let router = (function() {
    let _staticfolder;
    let setStaticfolder = (value) => { _staticfolder = value};
    let getStaticfolder = () => {
        return _staticfolder;
    }

   const extensions = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "application/javascript",
        ".png": "image/png",
        ".gif": "image/gif",
        ".jpg": "image/jpeg",
        ".json": "application/json",
        ".ico": "image/x-icon",
        ".mp4": "image/mp4"
       };

       let init = function(req, res, cb){
            //1. haal de extensies op
            if(req.url === "/") req.url = "index.html"
            let ext = path.extname(path.basename(req.url))
            //2. roep de gepaste handler op
            if(req.method == "GET") {   
                let filename = path.normalize(_staticfolder + "/" + req.url)
                RequestHandlers.getFile(filename, (error, rs)=> {
                    cb(null, rs, extensions[ext]);
                })

                //RequestHandlers.getFile(req.url).then(showResult, showError);
            }
       }

       return {init, setStaticfolder}

})();

module.exports = router;