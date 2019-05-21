import { settings } from "./settings.js";
import { drawHangman } from "./draw.js";
import { changeScene, randomWord } from "./main.js";

/*
    Name: game.js
    Description: Play hangman.
*/

let canvasWidth;
let canvasHeight;
let ctx;
let elements = [];
let secretWord = "";

export let game = {
    setup: function() {
        let e;
        
        e = document.createElement("h1");
        e.innerHTML = "Hangman!";
        document.body.appendChild(e);
        elements.push(e);
    
        e = document.createElement("canvas");
        e.id = "game";
        e.width = 640;
        e.height = 480;
        e.classList.add("game");
        document.body.appendChild(e);
        elements.push(e);
    
        canvasWidth = e.width;
        canvasHeight = e.height;
         
        // Blank the canvas
        ctx = e.getContext("2d");
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvasWidth - 1, canvasHeight - 1);

        // Draw the X.    
        ctx.strokeStyle = "white";
        ctx.moveTo(0, 0);
        ctx.lineTo(canvasWidth - 1, canvasHeight - 1);

        ctx.strokeStyle = "white";
        ctx.moveTo(canvasWidth - 1, 0);
        ctx.lineTo(0, canvasHeight - 1);
        ctx.stroke();

        let x = (canvasWidth - (6 * (settings.draw.size * 2.5))) / 2;
        let y = 240
        
        // None
        drawHangman(x, y, false, false, false, false, false, false, ctx);
        // Head
        x = x + (settings.draw.size * 2.5);
        drawHangman(x, y, true, false, false, false, false, false, ctx);
        // Body
        x = x + (settings.draw.size * 2.5);
        drawHangman(x, y, true, true, false, false, false, false, ctx);
        // Right Arm
        x = x + (settings.draw.size * 2.5);
        drawHangman(x, y, true, true, true, false, false, false, ctx);
        // Left Arm
        x = x + (settings.draw.size * 2.5);
        drawHangman(x, y, true, true, true, true, false, false, ctx);
        // Right Leg
        x = x + (settings.draw.size * 2.5);
        drawHangman(x, y, true, true, true, true, true, false, ctx);
        // Left Leg
        x = x + (settings.draw.size * 2.5);
        drawHangman(x, y, true, true, true, true, true, true, ctx);
    
        secretWord = randomWord();
        e = document.createElement("div");
        e.id = "target";
        e.innerHTML = "WORD: " + secretWord;
        document.body.appendChild(e);
        elements.push(e);

        e = document.createElement("button");
        e.innerHTML = "Menu";
        e.onclick = function() {
            changeScene("menu");
        };
        document.body.appendChild(e);
        elements.push(e);


    },

    cleanup: function() {
        elements.map(function (e) { document.body.removeChild(e); });
        elements = [];
    },
}