let words = ['DINOSAUR', 'ZEBRA', 'LIZARD', 'HORSE', 'MOOSE',
 'RAKE', 'WATER', 'CLEAN', 'SEED', 'PICK',
 'WATER', 'BREAD', 'FRUIT', 'BUTTER', 'MILK',
 'SCHOOL', 'WORK', 'HOME', 'CASTLE', 'BOAT',
 'PHONE', 'COMPUTER', 'BOOK', 'GAME', 'RADIO'];

let target_word;
let num_guesses;
let max_guesses = 6;
let game_over = false;

 // This adds the function jumble to the string object.
 // This will return a new string based on the current string except
 // trimmed, all caps, and with the characters scrambled around.
 String.prototype.jumble = function(){
	// We start with a copy of the original then start swapping letters
	// First we trimm off any leading or trailing spaces.
	// Then we switch it to all upper case, and finally
	// we make an array with each character in the original string.
	// We can do that all in one line since each function returns a 
	// string that has can call the next function in the chain.
	let jumbled = this.trim().toUpperCase().split('');
	let iterations;
	
	iterations = Math.max(jumbled.length, 20);
	for(let i = 0; i < iterations; i++) {
		let temp, x, y;
		do {
			x = Math.floor(Math.random() * jumbled.length);
			y = Math.floor(Math.random() * jumbled.length);
		} while (x == y)		
		// Swap the two characters. Temp is used to keep track of
		// the first character before it is overwritten.
		temp = jumbled[x];
		jumbled[x] = jumbled[y];
		jumbled[y] = temp;
	}
	
	return jumbled.join('');
};

// Check if we should call the guess function.
function CheckGuess(e) {
	// e is a parameter to the function, it is filled with a object that has information
	// about the keystoke event this function was called in response to.
	//
	// 13 is the key code for the Enter/Return key.
	if (e.which == 13) { 
		Guess();
	}
}

// See if the word in the text field is equal to the word we are trying to guess.
// If it is go to a win state. 
// If not inform the user and decrement remaining guesses. If out of guesses, go to 
// the game over state.
function Guess() {
	let word;
	if (!game_over) {
		word = document.getElementById('guessText').value.trim().toUpperCase();
		
		if (word == target_word){
			document.getElementById('message').innerHTML = 'CONGRATULATIONS!<br />The word was: &quot;' + target_word + '&quot;. You guessed correctly.';
			game_over = true;
		}
		else {
			num_guesses = num_guesses - 1;
			document.getElementById('message').innerHTML = 'SORRY: &quot;' + word + '&quot; is incorrect. You have ' + num_guesses.toString() + ' tries remaining.';
			if (num_guesses <= 0) {
				game_over = true;
				document.getElementById('message').innerHTML = document.getElementById('message').innerHTML + '<br />GAME OVER!<br />The word was &quot;' + target_word + '&quot;';
			}
		}
		
		if (game_over) {
			document.getElementById('game').className = 'hidden';
			document.getElementById('restart').className = 'visible';
			document.getElementById('newGame').focus();
		}
	}
}

// Start a new game.
// Pick a word from the list, then write a jumbled version to the html.
// Show and hide sections of the html as needed.
// Set the variables to the start of game state.
function NewGame() {
	let guessText = document.getElementById('guessText');
	target_word = words[Math.floor(Math.random() * words.length)];
	document.getElementById('jumbledWord').innerHTML = target_word.jumble();
	document.getElementById('start').className = 'hidden';
	document.getElementById('game').className = 'visible';
	document.getElementById('message').innerHTML = '';
	document.getElementById('restart').className = 'hidden';
	guessText.value = '';
	guessText.focus();

	num_guesses = max_guesses;
	game_over = false;
}