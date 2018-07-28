let num_repetitions = 10000;	// Modify this to do more or less repetitions.
let batch_size = 100;			// How many repetitions per batch. Smaller numbers means slower results, bigger number means a less responsive web page.
let stop_flag = false;			// Set to true when we want to stop early.
let win_switch = 0;				// How many wins do we get by switching doors.
let win_stay = 0;				// How many wins do we get by keeping our original door choice.
let interval_id = 0;			// Keep track of our interval timer. Need the id to clear the timer later.

// Start or Stop the simulation.
// What to do is based on the label the button has. Start or Restart starts it, 
// anything else sets the flag for it to stop.
function StartSimulation()
{
	// The results div is not displayed when the page is initially loaded.
	// Make sure it is visible when we start the simulation.
	document.getElementById('results').style.display = 'block';
	// Based on the start button label we are either starting or stopping the simulation.
	let startButton = document.getElementById('startButton')
	if ((startButton.innerHTML == 'Start') || (startButton.innerHTML == 'Restart'))
	{
		startButton.innerHTML = 'Stop';
		stop_flag = false;
		RunSimulation();
	}
	else
	{
		stop_flag = true;
	}
}

// Small function to return a random integer between 0 and 2.
// I found myself writing the same thing several times so I just made it a function.
function RandomDoor() {
	return Math.floor(Math.random() * 3);
}

// If we run straight through, the web browser will not update the screen with
// progress or give us the ability to stop until it is over. 
// Instead we break up the simulation into batches and call setInterval to 
// periodically run a section. More trouble than I wanted for a simple sample program.
function RunSimulation() {
	win_switch = 0
	win_stay = 0
	stop_flag = false;
	interval_id = setInterval(RunSimulationBatch, 10);	
}

// Runs the next batch of the simulation. Calculates where to start, and how far to
// go ensuring we don't go too far.
function RunSimulationBatch() {
	let counter = win_stay + win_switch + 1;
	let maxCount = Math.min(num_repetitions, counter + batch_size - 1);
	
	for(let i = counter; i <= maxCount; i++) {
		// Choose which door has the money and which the "player" chose
		prize_door = RandomDoor();
		chosen_door = RandomDoor();
		
		// Figure out the door for the game show host to reveal
		revealed_door = RandomDoor();
		while ((revealed_door == prize_door) || (revealed_door == chosen_door)) {
			revealed_door = revealed_door + 1;
			if (revealed_door >= 3) {
				revealed_door = 0;
			}
		}
		
		if (prize_door == chosen_door) {
			win_stay = win_stay + 1;
		}
		else {
			win_switch = win_switch + 1;
		}		
		
		// If we hit the stop button, then exit out of the loop.
		if (stop_flag == true)
		{
			break;
		}
	}
	
	ShowResults(win_stay, win_switch, win_stay + win_switch);
	
	// If we finished or stopped early then clear the interval timer
	// and change the start button lablel to Restart.
	if (((win_stay + win_switch) >= num_repetitions) || stop_flag) {
		clearInterval(interval_id);
		document.getElementById('startButton').innerHTML = 'Restart'; // Finished, set to stopped state.		
	}
}

// Find the two labels and progress bar and update them with the current results.
function ShowResults(countStay, countSwitch, count) {
	// Look up the elements we want to update on the web page.
	let doorSwitch = document.getElementById('doorSwitch');
	let doorStay = document.getElementById('doorStay');
	let barGraph = document.getElementById('barGraph');
	
	// Math.round will round you to the nearest integer. I want up to two
	// decimal places so I multiply by 100, round it then divide it again.
	// We would already be multiplying by 100 to get percentage so it is combined
	// to just multiplying by 10,000.0.	
	doorStay.innerHTML = (Math.round((countStay * 10000.0)/ count) / 100).toString() + '% (' + countStay.toString() + ')';
	doorSwitch.innerHTML = (Math.round((countSwitch * 10000.0)/ count) / 100).toString() + '% (' + countSwitch.toString() + ')';
	barGraph.value = ((countStay * 100.0) / count);
}