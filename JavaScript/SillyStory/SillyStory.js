var configJSON = '';
var htmlBody = '';

function readFile(fileName, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', fileName, true);
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == '200') {
            callback(xmlHttp.responseText);
        }
    }
    xmlHttp.send(null);
}

function LoadGame() {
	var dropDown = document.getElementById("chooseStory");
	var storyName = "";
	
	if (dropDown.selectedIndex >= 0) {
		storyName = dropDown.options[dropDown.selectedIndex].value;
	}
	
	if (storyName.length > 0) {
		document.getElementById('main').innerHTML = 'Loading story information..';
		readFile(storyName, function(text) {
			configJSON = JSON.parse(text);
			readFile(configJSON.file, function(text) {
				document.getElementById('main').innerHTML = 'Loading story...';
				htmlBody = text;
				AskForWords();
			});
		});
	}
}

function AskForWords() {
	var foundWord = false;
	for (var i = 0; i < configJSON.data.length; i++)
	{
		var obj = configJSON.data[i];
		if (!obj.hasOwnProperty('replace'))
		{
			foundWord = true;
			AskForWord(obj);
			break;
		}
	}
	if (!foundWord) {
		WriteStory();
	}
}

function AskForWord(item) {
	var node;
	var doneYet
	node = document.getElementById('main');
	node.innerHTML = ''; // Erase current contents.
	// Lets add in nodes programatically to show how you can do so.
	divQuestion = document.createElement('DIV');
	txtQuestion = document.createTextNode(item.prompt);
	divQuestion.appendChild(txtQuestion)
	node.appendChild(divQuestion);
	
	divInput = document.createElement('DIV');
	txtInput = document.createElement('INPUT');
	txtInput.id = 'txtInput';
	txtInput.type = 'text';
	txtInput.size = '30';
	txtInput.onkeypress = function(e) {		
		var txtValue = document.getElementById('txtInput').value.trim();
		if (txtValue.length > 0) {
			// 13 is the key code for the Enter/Return key.
			if (e.which == 13) { 
				item.replace = txtValue;
				node.innerHTML = '';
				AskForWords();			
			}
		}
	}
	btnInput = document.createElement('BUTTON');
	btnLabel = document.createTextNode('OK');
	btnInput.appendChild(btnLabel);
	btnInput.onclick = function(e) {
		var txtValue = document.getElementById('txtInput').value.trim();
		if (txtValue.length > 0) {
			item.replace = txtValue;
			node.innerHTML = '';
			AskForWords();			
		}
	}	
	divInput.appendChild(txtInput);
	divInput.appendChild(btnInput);
	
	node.appendChild(divQuestion);
	node.appendChild(divInput);
	txtInput.focus();
}

function WriteStory()
{
	var newBody;
	newBody = htmlBody;
	for (var i = 0; i < configJSON.data.length; i++)
	{
		var obj = configJSON.data[i];
		newBody = newBody.replace(new RegExp(obj.search, 'g'), EntityReplace(obj.replace));
	}
	document.getElementById('main').innerHTML = newBody;
}

function EntityReplace(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}