import "./hangman.css";
import { game } from "./game.js";
import { help } from "./help.js";
import { menu } from "./menu.js";
import { loading } from "./loading.js";

let currentScene;
let scene = {
    "game": game,
    "help": help,
    "loading": loading,
    "menu": menu,
}

let words = [];

export let setWords = function(newWords) {
    words = newWords;
};

export let changeScene = function(newScene) {
    if (currentScene != null) {
        scene[currentScene].cleanup();
    }
    currentScene = newScene;
    scene[currentScene].setup();
}

export let randomWord = function() {
    return words[Math.floor(Math.random() * words.length)].toString();
}

function setup() {
    currentScene = null;
    changeScene("loading");
}

setup();
