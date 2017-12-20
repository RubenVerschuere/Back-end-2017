/**
* @classDescription	    Using XMLHTTP object to return webservice data (async)
* @param                {String} url ,{function } callback
* @author 		        Web@howest - JVN
* @version		        1.0.0 
*/
const XHR = (function () {

    // PRIVATE GEDEELTE
    let clean = function (data, cb) { };

    let serialize = function (form, cb) {
        let formData = "";
        for (let i = 0, el, val; i < form.elements.length; i++) {
            el = form.elements[i];
            if (el.name && el.value) {
                val = (el.type == "checkbox" || el.type == "radio" ? (el.checked ? el.value : '') : el.value);
                if (val) {
                    formData += el.name + "=" + escape(val) + "&";
                }
            }
        }
        return formData;
    };

    let createRequest = function (cb) {
        if (window.XMLHttpRequest) {
            cb(null, new XMLHttpRequest());
        } else if (window.ActiveXObject) {
            cb(null, new ActiveXObject('MSXML2.XMLHTTP.3.0'));
        }
    };

    return {
        loadData: function (url, cb) {
            createRequest(function (err, xHR) {
                if (err) { console.log(err); cb(err, null); }
                xHR.onreadystatechange = function () {
                    if (xHR.readyState == 4 && xHR.status == 200) {
                        if (xHR.responseText !== "")
                        { cb(null, xHR.responseText); }
                    }
                };
                xHR.open('GET', url, true);
                xHR.send();
            });
        },

        postData: function (url, form, cb) {
            createRequest(function (err, xHR) {
                if (err) { console.log(err); cb(err, null); }
                xHR.onreadystatechange = function () {
                    if (xHR.responseText !== "")
                    { cb(null, xHR.responseText); }
                };

                xHR.open(form.method, url, true); //Must open before header

                if (form.enctype == "application/x-www-form-urlencoded") {
                    xHR.setRequestHeader("Content-type", form.enctype);
                    xHR.send(serialize(form));
                } else {
                    //requestHeader wordt auto ingevuld volgens de specificatie
                    let formData = new FormData(form);
                    //formData.append("CustomField", "some extra data");
                    xHR.send(formData);
                }
            });
        }
    };

})();