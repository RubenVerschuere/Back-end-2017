const fs = require("fs");
let fileName = __dirname + '../Data/MyTextfile.txt'; //absolute path vd file map
console.log(fileName);

/*fs.exists(fileName, function (exists) {
    //callback 1: bestaat de file (enkel voor de demo -> gebruik stats)
    if (exists) {
        fs.stat(fileName, function (error, stats) {
            //callback 2: haal statistische data vd file op (is het een file?)
            if (error) { throw error };
            if (stats.isFile()) {
                fs.readFile(fileName, null, function (error, data) {
                    //callback 3: lees binair indien stats een file aanduidt
                    if (error) { throw error };
                    console.log(data.toString('utf-8'));
                });
            }
        });
    } else {
        console.log(fileName, "bestaat niet.")
    }
});*/

//benoemen van callbacks
fs.access(fileName, cbAccess);

function cbAccess(accessErr) {
    if (accessErr === null){
        fs.stat(fileName, cbStat);
    }
}

const cbStat = (error, stats) => {
    if (error) {throw error}
    if (stats.isFile()){
        fs.readFile(fileName,null,cbReadFile )  
    }
}

const cbReadFile = (err, result) => { 
    if(err) { throw err; }
    console.log(result.toString('utf-8'));
} 

//Wanneer hij 1 keer een const opvraagt gaat hij direct alle const opvragen.

