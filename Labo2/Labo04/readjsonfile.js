//MET PROMISES
function readFile(filename, version){
    return new Promise((resolve, reject)=> {
        fs.readFile(filename, 'utf-8', (err, data)=> {
            if(err) 
                return reject(err);
            resolve(data);            
        });
    });
}


function writeFile(file, data, options){

}

function geefkorting(data){

}

readFile(filename, 'utf-8').then(res => {
    res = JSON.parse(res);
    return geefkorting(res);
}).then(res => {
    res.lastChange = new Data();
    return writeFile(filename, JSON.stringify(res));
}).then(res => {
    console.log("Korting gegeven! :)")
}).catch(err => console.log(err));