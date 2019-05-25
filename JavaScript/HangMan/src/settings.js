import wordList from "../data/wordlist.csv";
import soundWin from "../data/youwin.mp3";
import soundLose from "../data/gameover.mp3";

export let settings = {
    draw: {
        size: 32,
        styleBg: "black",
        styleSkin:  "peachpuff",
        styleNoose: "lightslategray",
        styleHat:   "saddlebrown",
        stylePen:   "black",
        styleEye:   "white",
        stylePupil: "black",
        styleShirt: "firebrick",
        stylePants: "royalblue",
        styleBoots: "saddlebrown",
        styleGallows: "#4b2a12",
    },
    wordList: wordList,
    soundWin: new Audio(soundWin),
    soundLose: new Audio(soundLose),
}
