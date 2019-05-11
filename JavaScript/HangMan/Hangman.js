/* 
Hangman.js
*/

let cxt;

function setup() {
    let canvasEl;
    canvasEl = document.getElementById("game");
    ctx = canvasEl.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 639, 479);

    ctx.strokeStyle = "white";
    ctx.moveTo(0, 0);
    ctx.lineTo(639, 479);
    ctx.moveTo(639, 0);
    ctx.lineTo(0, 479);
    ctx.stroke();
}