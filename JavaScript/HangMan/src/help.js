import { changeScene } from "./main";
/*
    Name: help.js
    Description: Show the help screen.
*/

let elements = [];

export let help = {
    setup: function() {
        let e;
        e = document.createElement("h1");
        e.innerHTML = "Hangman";
        document.body.appendChild(e);
        elements.push(e);

        e = document.createElement("p");
        e.innerHTML = `Guess the secret word. 
        Click the A-Z buttons below to guess letters in the word.
        Every time you choose a letter not in the word, a body part
        is added to the hangman.`;
        document.body.appendChild(e);
        elements.push(e);

        e = document.createElement("p");
        e.innerHTML = `If you guess the word before you add all of the 
        parts to the hangman you win. If you run out of body parts, the
        man gets the noose, and you lose.`;
        document.body.appendChild(e);
        elements.push(e);

        
        e = document.createElement("p");
        e.innerHTML = `You can't guess the same word twice, and there is no
        penalty for guessing vowels or common consonants first.`;
        document.body.appendChild(e);
        elements.push(e);

        e = document.createElement("button");
        e.innerHTML = "Back";
        e.className = "buttonHelp";
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