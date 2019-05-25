import { settings } from "./settings.js";
import { drawHangman } from "./draw.js";
import { changeScene, randomWord } from "./main.js";
import { popupYesNo } from "./popup.js";
/*
    Name: game.js
    Description: Play hangman.
*/

let canvasWidth;
let canvasHeight;
let ctx;
let elements = [];
let guesses = "";
let numMisses = 0;
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
        e.width = settings.draw.size * 7;
        e.height = settings.draw.size * 9;
        e.classList.add("game");
        document.body.appendChild(e);
        elements.push(e);

        ctx = e.getContext("2d");
    
        canvasWidth = e.width;
        canvasHeight = e.height;

        redrawHangman(ctx, 0);
         
        
        e = document.createElement("div");
        e.id = "target";
        e.innerHTML = "WORD: ";
        document.body.appendChild(e);
        elements.push(e);

        for(let i = 0; i < 26; i++) {
            e = document.createElement("button");
            e.innerHTML = String.fromCharCode("A".charCodeAt(0) + i);
            e.id = "btn_" + e.innerHTML;
            e.className = "letter";

            e.onclick = function(e) {
                guess(e.target, ctx, e.target.innerHTML);
            };
            document.body.appendChild(e);
            elements.push(e);
        }
        
        resetGame()

    },

    cleanup: function() {
        elements.map(function (e) { document.body.removeChild(e); });
        elements = [];
    },
}

function redrawHangman(ctx, numMisses) {
    // Blank the canvas
    console.log(canvasWidth);
    console.log(canvasHeight);
    ctx.strokeStyle = settings.draw.styleBg;
    ctx.fillStyle = settings.draw.styleBg;
    ctx.fillRect(0, 0, canvasWidth - 1, canvasHeight - 1);

    drawHangman(settings.draw.size * 4, settings.draw.size * 2, numMisses >= 1, numMisses >= 2, numMisses >= 3, numMisses >= 4, numMisses >= 5, numMisses >= 6, ctx);
}

function resetGame() {
    numMisses = 0;
    guesses = "";
    secretWord = randomWord();

    // Enable all buttons.
    for(let i = 0; i < 26; i++) {
        let e = document.getElementById("btn_" + String.fromCharCode("A".charCodeAt(0) + i));
        e.disabled = false;
    }

    redrawHangman(ctx, numMisses);
    updateWordDisplay();    
}

function guess(btn, ctx, char) {
    if (guesses.indexOf(char) == -1) {
        btn.disabled = true;
        if(secretWord.indexOf(char) == -1) {
            numMisses = numMisses + 1;
        }
        guesses = guesses + char;
        updateWordDisplay();
        redrawHangman(ctx, numMisses);        
        
        if (isGameLost()) {
            settings.soundLose.play();
            popupYesNo("Game Over!", 
            "I am sorry, but you lost!. The word was '" + secretWord + "'. Would you like to play again?", playAgain, mainMenu);
        } else if (isGameWon()) {
            settings.soundWin.play();
            popupYesNo("You Win!", 
            "You win, you correctly guessed that the word was '" + secretWord + "'. Would you like to play again?", playAgain, mainMenu);
        }
    }
}

function updateWordDisplay() {
    let displayWord = "";
    let e = document.getElementById("target");

    for(let i = 0; i < secretWord.length; i++) {
        let ch = secretWord.substring(i, i + 1);
        if (guesses.indexOf(ch) == -1) {
            displayWord = displayWord + "_ ";
        } else {
            displayWord = displayWord + ch + " ";
        }
    }
    e.innerHTML = "WORD: " + displayWord;
}

function isGameLost() {
    if (numMisses >= 6) {
        return true;
    }
    return false;
}

function isGameWon() {

    for(let i = 0; i < secretWord.length; i++) {
        let ch = secretWord.substring(i, i + 1);
        if (guesses.indexOf(ch) == -1) {
            return false;
        } 
    }
    return true;
}


function playAgain() {
    resetGame();
}

function mainMenu() {
    changeScene("menu");   
}