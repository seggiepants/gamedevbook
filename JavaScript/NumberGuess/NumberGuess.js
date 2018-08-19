// Guess the Number
// 
// Lines that start with two forward slashes are a comment.
/*
You can also have multi-line comments 
that begin with a forward slash and asterisk, and end with an asterisk and forward slash.
Like this one.
*/
// Comments let you add information to your code that explains how or why things
// work the way they do. You can also leave notes for yourself. You should use comments
// frequently. It is a good idea to have a header before each function or procedure with comments.
//
// This game is really more of a reference than a game. It shows how to declare and use functions. 
// It shows you how to use for, while, and do while loops. It also shows
// you how to construct an if/elseif/else conditionals. Please refer to this later if you need a refresher.

// This is how you declare a simple variable.
// We could have put the variable declaration and assign it to a function in one line (but I am trying to keep things simple).
let user_name;
// We can also make arrays. I add some sample data for demonstration purposes only.
let lines = ['one', 'two', 'three'];
// You can also create a variable and assign a value to it.
let max_lines = 10;
let maximum_tries = 5;
let maximum_value = 10;

// We will have HTML call this function once the screen loads.
function PlayGame() {
	// Reset the lines array, in case we let the user play again.
	lines = [];
	document.getElementById('message').innerHTML = '';
	
	// Hide the play again button.
	document.getElementById('playAgain').className = 'hidden';
	// Prompt isn't well liked in javascript. However I will be using it
	// anyway to keep the code easier to read and understand.
	user_name = prompt('What is your name?');

	// Note the use of + to join strings together into a larger string.
	AppendMessage('Welcome, ' + user_name + ' it is time to play Number Guess.');

	// You can use the toString() method to get the string version of a number.
	AppendMessage('I am thinking of a number between 1 and ' + maximum_value.toString() + '.');
	AppendMessage('You have ' + maximum_tries.toString() + ' tries to guess what it is.');
	AppendMessage('');

	// Math.Random() will return a floating point number between 0 and 1.
	// To get it to our range we multiply by the maximum and add 1.
	// Math.floor() will give us a whole number without a decimal point.
	target_value = Math.floor(Math.random() * maximum_value) + 1;
	
	// This is how you log to the console. Users can see this if they know how.
	// This is handy for debugging.
	console.log('The secret number is: ' + target_value.toString());

	// How many times we tried to guess the number.
	tries = 0;

	// Are we done with the game? We use the TRUE and FALSE constants to say if it is a TRUE or FALSE statement.
	game_over = false;

	// This is an example of a while loop. Because we check the loop condition first, we may never go into
	// the loop if the condition is not true.
	//
	// == means check if equal
	// = means set equal to.
	while (game_over == false) {
		// Run this loop until game over.
		
		// Call our function below to get the user's next guess.
		// Note that the variable name passed in doesn't have to match the name in the function declaration.
		// In fact you could pass in a plain number that isn't a variable at all.
		current_guess = PromptNumber(maximum_value);
		
		// This is an if/then/else conditional. If something is true you do one thing. If not, we carry out
		// the else part. The else part is optional.
		if (current_guess == target_value)  {
			AppendMessage('Congratulations, You WIN!!');
			game_over = true;
		}
		// Use elseif to check for another condition, or else to finish up for any leftover possibilities.
		// You can also nest a if statement inside of another if statement if needed.
		// We will nest here, because we don't need to check for game over if you just won.
		else {
			if (current_guess < target_value) {
				AppendMessage('Too low');
			}
			else {
				// Only one option left, too high.
				AppendMessage('Too high');
			}
			tries = tries + 1;
			if (tries >= maximum_tries) {
				AppendMessage('Too many guesses, GAME OVER!');
				AppendMessage('The number was:  ' + target_value.toString() + '.');
				game_over = true;
			}
		}
	}

	AppendMessage('Thank you for playing');
	
	// Show the play again button.
	document.getElementById('playAgain').className = 'visible';
}

// This function will prompt for a number. It will continue to prompt until you enter a number between 1 and the 
// max_value passed in. max_value is a parameter to the function. You can have multiple parameters to a function or
// none at all. If you have many they will be separated by commas.
//
// This is small enough it doesn't really need a function, I just wanted to show you what one looks like.
function PromptNumber(max_value) {
	// variables created inside of a function aren't available outside of it.
	// If you reuse a variable name from the global scope, only the locally defined
	// version will be available here.
	// It is best to keep global variables to a minimum and only use global variables when necessary.
	let text, num;
	
	// Here we have a REPEAT UNTIL loop. The program will always go through the loop at least once.
	// We say that it is a bottom tested loop as it checks to see if it should loop at the bottom of the block.
	do {
		// parseInt will change a string into a number.
		text = prompt('What is your guess?');
		num = parseInt(text);
		
		if (isNaN(num)) {
			// If you pass in something that isn't a number to parseInt, it 
			// returns a special Not a Number code. If we got that just change
			// it to zero. We will use isNaN to detect a number parse error.
			num = 0;
			alert('"' + text + '" is not a number. Try again.');
		}
		else if (num < 1) {
			alert(num.toString() + ' is too small for the given range. Try again.');
		}
		else if (num > max_value) {
			alert(num.toString() + ' is too large for the given range. Try again.');
		}		
	}
	while (num < 1 || num > max_value)
	// && is the boolean and operator. It will be true when both checks are true and false otherwise.
	// || is the boolean or operator. It will be true when either check is true, and only false if both checks are.
	
	
	// To return a value back to the caller use the return statement. 
	return num;
}


// I want a sort of console that shows the last max_lines messages.
// Old lines dissapear as new ones are added once you get to the maximum
// number of rows. This will hopefully stop us from neededing to scroll
// on the web page.
//
// I am also showing how to add and remove items from an array. This isn't
// strictly necessary as no game will get that big.
function AppendMessage(message) {
	let new_message;
	
	while (lines.length >= max_lines) {
		// shift removes the first element from an array.
		// likewise unshift adds a new element to the beginning of an array.
		lines.shift();
	}
	
	// push adds an item to the end of an array.
	// likewise pop removes the last element from an array.
	lines.push(message);
	
	//Join makes a large string out of the elements in an array. If you pass
	//a separator it will put it between any two elements in the output string.
	new_message = lines.join('<br />');
	
	document.getElementById('message').innerHTML = new_message;		
}