"use strict";

//promises gebruiken ipv callbacks. Callback kan je vervangen door promises

const sum = (a,b)=> {
    return new Promise((resolve, reject) => {   //voorbeeld van Promise met som.
        if(false) {reject('tis mis')
        }
        else {
            resolve(a+b)
        }
    });
}

sum(2,2).then((result) => console.log(result), (reject) => console.log(reject))    //als het klopt dan result als het niet klopt reject
        .then(() => {console.log("merci voor de aandacht")}, () => {console.log("Promise is kapot")})  
      