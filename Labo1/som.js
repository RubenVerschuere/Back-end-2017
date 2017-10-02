//som.js

//1. Es5
var sum = function (a, b) { return a+b; }
console.log(sum(1,3));

//2. ES6 (arrow functies, bloc scoping)

const sum2 =  (a, b) => { //zelfde als function (a,b)
    //this = oproepend object
    return a+b; 
} 
console.log(sum2(4,8))

//Een Var gaat hij altijd bovenaan de pagina plaatsen.
//Daarom hebben ze Let geïntroduceert. Let wordt maar geïnitialiseerd op de plaats waar het staat
//Const 

//ES5 Async
var sumasync = function (a, b, callback) {  
    if(a === 10){
        callback("Error", null)
    }
    callback(null, a+b) 
}

sumasync(2,3,function(err, result){
    console.log(err || result)
});


//ES6 async
var sumasync6 =  (a, b, callback) => {  
    if(a === 10){
        callback("Error", null) //of return callback("Error", null) om de functie in elk geval te stoppen
    }
    else {
    callback(null, a+b) 
    }
}

sumasync6(10,3,function(err, result){
    console.log(err || result)
});