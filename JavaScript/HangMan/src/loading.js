import { changeScene, setWords } from "./main.js";
import { settings } from "./settings.js";

/*
    Name: loading.js
    Description: Show the loading screen.
*/

let elements = [];

export let loading = {
    setup: function() {
        let e;
        e = document.createElement("h1");
        e.innerHTML = "Hangman";
        document.body.appendChild(e);
        elements.push(e);

        e = document.createElement("p");
        e.innerHTML = "Loading ...";
        document.body.appendChild(e);
        elements.push(e);

        getFile(settings.wordList);

    },

    cleanup: function() {
        elements.map(function (e) { document.body.removeChild(e); });
        elements = [];
    },
}

function getFile(fileName) {
    // This function was largely copied off Stack Overflow.
    // Load a file using AJAX (Asynchronus Javascript and XML).    
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        // Anonymous function to call when the load completes.
        if (this.readyState == 4 && this.status == 200) {
            setWords(parseCSV(xmlhttp.responseText).map(function(str) {
                return str.toUpperCase();
            }));
            // Save until we implement later.
            /*document.getElementById("target").innerHTML = "Word: " + 
                this.words[Math.floor(Math.random() * this.words.length)].toString();
            */
           changeScene("menu");
        }
    };    
    // Send a GET request to get the file.
    xmlhttp.open("GET", fileName, true);
    xmlhttp.send();
}

function parseCSV(message) {
    // csv parsing regular expression
    // A-Z (one or more charcaters) upper or lower case followed by a comma or new line
    // You will want a blank line at the end of the file.
    let re = /([A-Za-z]+)[,\r\n]/g;
    return message.split(re). filter (
        // I seem to get capture groups for the white space.
        // this anonymous function should filter them out.
        function(word) {
            // Return a true if the given word isn't white-space.
            word = word.trim();
            return (word.length > 0 && word != "\r" && word != "\n" && word != "\t");
        });
}            
