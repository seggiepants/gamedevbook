import "./hangman.css";
import { drawHangman } from "./draw.js";
import { settings } from "./settings.js";

let ctx;
let canvasWidth, canvasHeight;
export let words = [];

export function setup() {
    let headerEl;
    let canvasEl;
    let wordEl;
    
    headerEl = document.createElement("h1");
    headerEl.innerHTML = "Hangman!";
    document.body.appendChild(headerEl);

    canvasEl = document.createElement("canvas");
    canvasEl.id = "game";
    canvasEl.width = 640;
    canvasEl.height = 480;
    canvasEl.classList.add("game");
    document.body.appendChild(canvasEl);

    canvasEl = document.getElementById("game");
    canvasWidth = canvasEl.width;
    canvasHeight = canvasEl.height;

    wordEl = document.createElement("div");
    wordEl.id = "target";
    wordEl.innerHTML = "WORD: ";
    document.body.appendChild(wordEl);

    getFile(settings.wordList);

    // Blank the canvas
    ctx = canvasEl.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 639, 479);

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
}

function getFile(fileName) {
    // This function was largely copied off Stack Overflow.
    // Load a file using AJAX (Asynchronus Javascript and XML).    
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        // Anonymous function to call when the load completes.
        if (this.readyState == 4 && this.status == 200) {
            this.words = parseCSV(xmlhttp.responseText).map(function(str) {
                return str.toUpperCase();
            });
            document.getElementById("target").innerHTML = "Word: " + 
                this.words[Math.floor(Math.random() * this.words.length)].toString();
        }
    };    
    // Send a GET request to get the file.
    document.getElementById("target").innerHTML = "Loading ...";
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


setup();