let elBG;
let elFG;
let elTitle;
let elMessage;
let elButtonDiv;
let btnYes;
let btnNo;

export function popupYesNo(title, message, yesCallback, noCallback) {
    elBG = document.createElement("div");    
    elBG.className = "modalBackground";
    document.body.appendChild(elBG);

    elFG = document.createElement("div");
    elFG.className = "modalContent";
    elBG.appendChild(elFG);

    elTitle = document.createElement("h2");
    elTitle.innerHTML = title;
    elFG.appendChild(elTitle);

    elMessage = document.createElement("p");
    elMessage.innerHTML = message;
    elMessage.className = "modalMessage";
    elFG.appendChild(elMessage);

    elButtonDiv = document.createElement("span");
    elButtonDiv.className = "buttonContainer"
    elFG.appendChild(elButtonDiv);

    btnYes = document.createElement("button");
    btnYes.innerHTML = "Yes";
    btnYes.className = "popupButton";
    btnYes.onclick = function() { 
        yesCallback();
        popupYesNoDestroy();
    };
    elButtonDiv.appendChild(btnYes);

    btnNo = document.createElement("button");
    btnNo.innerHTML = "No";
    btnNo.className = "popupButton";
    btnNo.onclick = function() { 
        noCallback();
        popupYesNoDestroy();
    };
    elButtonDiv.appendChild(btnNo);
}

function popupYesNoDestroy() {
    elButtonDiv.removeChild(btnYes);
    elButtonDiv.removeChild(btnNo);
    elFG.removeChild(elButtonDiv);
    elFG.removeChild(elMessage);
    elFG.removeChild(elTitle);
    elBG.removeChild(elFG);
    document.body.removeChild(elBG);
}