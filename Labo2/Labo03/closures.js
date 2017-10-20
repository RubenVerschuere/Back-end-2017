//closures

const processData = function (x) {
    let init = 2, key = 10;
    //closure:
    function secretCalc(y) {
    console.log(x + 2 * y + (++init));
    }
    secretCalc(key);
   };
   processData(2); // 25 met enkel x als argument
   processData(2); 