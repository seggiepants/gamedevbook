import { changeScene } from './main.js';

/*
    Name: menu.js
    Description: Show the main menu.
*/

let elements = [];

export let menu = {
    setup: function() {
        let e;
        e = document.createElement("h1");
        e.innerHTML = "Hangman";                
        document.body.appendChild(e);
        elements.push(e);

        e = document.createElement("button");
        e.innerHTML = "Play";
        e.onclick = function() {
            changeScene("game");
        };
        document.body.appendChild(e);
        elements.push(e);

        e = document.createElement("button");
        e.innerHTML = "Help";
        e.onclick = function() {
            changeScene("help");
        };
        document.body.appendChild(e);
        elements.push(e);
    },

    cleanup: function() {
        elements.map(function (e) { console.log(e); document.body.removeChild(e); });
        elements = [];
    },
}