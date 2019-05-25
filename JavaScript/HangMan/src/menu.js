import { changeScene } from './main.js';
import { drawHangman } from './draw.js';
import { settings } from './settings.js';
/*
    Name: menu.js
    Description: Show the main menu.
*/

let elements = [];

export let menu = {
    setup: function() {
        let e;
        let ctx;
        e = document.createElement("h1");
        e.innerHTML = "Hangman";                
        document.body.appendChild(e);
        elements.push(e);

        e = document.createElement("canvas");
        e.id = "game";
        e.width = settings.draw.size * 7;
        e.height = settings.draw.size * 9;
        e.classList.add("game");
        document.body.appendChild(e);
        elements.push(e);
        ctx = e.getContext("2d");
        drawHangman(settings.draw.size * 4, settings.draw.size * 2, true, true, true, true, true, true, ctx);

        e = document.createElement("button");
        e.innerHTML = "Play";
        e.className = "menuButton";
        e.onclick = function() {
            changeScene("game");
        };
        document.body.appendChild(e);
        elements.push(e);

        e = document.createElement("button");
        e.innerHTML = "Help";
        e.className = "menuButton";
        e.onclick = function() {
            changeScene("help");
        };
        document.body.appendChild(e);
        elements.push(e);
    },

    cleanup: function() {
        elements.map(function (e) { document.body.removeChild(e); });
        elements = [];
    },
}