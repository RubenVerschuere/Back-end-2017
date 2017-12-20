/* Browser client */

let client = {};
client.api = (function () {
    //blijft local binnen de client.api namespace
    var start = document.addEventListener("DOMContentLoaded", function (event) {
        console.log("DOM fully loaded and parsed");
        addListeners();

    });
    var addListeners = () => {
        let btn = document.querySelector('input[type="submit"]');
        let searchResults = document.querySelector('#searchResults');
        btn.addEventListener("click", function (e) { handleAPICall(e); });
    };
    var handleAPICall = function (e) {
        //1.stop submit en page refresh(!)
        e.preventDefault();
              
        //2. TO DO:
        let url = location.protocol + "//" + location.host + "/...";
        console.log("handler not implemented yet");
   
    };
    return {
        //is een global javascript object binnen de namespace
        start: start
    };
})();