/* 
Hangman.js
*/

let SCALE_SIZE = 32;

let cxt;
let canvasWidth, canvasHeight;

function setup() {
    let canvasEl;
    canvasEl = document.getElementById("game");
    canvasWidth = canvasEl.width;
    canvasHeight = canvasEl.height;

    // Blank the canvas
    ctx = canvasEl.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 639, 479);

    // Draw the X.    
    ctx.strokeStyle = "white";
    ctx.moveTo(0, 0);
    ctx.lineTo(canvasWidth - 1, canvasHeight - 1);

    ctx.strokeStyle = "white";
    ctx.moveTo(canvasWidth - 1, 0);
    ctx.lineTo(0, canvasHeight - 1);
    ctx.stroke();

    drawHead(100, 100, false);
    drawBody(100, 100)

    drawRightArm(100 - SCALE_SIZE / 2, 100);
    drawLeftArm(100 + SCALE_SIZE / 2, 100);

    drawRightLeg(100 - SCALE_SIZE / 2, 100 + (1.75 * SCALE_SIZE));
    drawLeftLeg(100 + SCALE_SIZE / 2, 100 + (1.75 * SCALE_SIZE));

    drawHead(200, 100, true);
    drawBody(200, 100)

    drawRightArm(200 - SCALE_SIZE / 2, 100);
    drawLeftArm(200 + SCALE_SIZE / 2, 100);

    drawRightLeg(200 - SCALE_SIZE / 2, 100 + (1.75 * SCALE_SIZE));
    drawLeftLeg(200 + SCALE_SIZE / 2, 100 + (1.75 * SCALE_SIZE));
    
    let x = (canvasWidth - (6 * (SCALE_SIZE * 2.5))) / 2;
    let y = 240
    
    // None
    drawHangman(x, y, false, false, false, false, false, false);
    // Head
    x = x + (SCALE_SIZE * 2.5);
    drawHangman(x, y, true, false, false, false, false, false);
    // Body
    x = x + (SCALE_SIZE * 2.5);
    drawHangman(x, y, true, true, false, false, false, false);
    // Right Arm
    x = x + (SCALE_SIZE * 2.5);
    drawHangman(x, y, true, true, true, false, false, false);
    // Left Arm
    x = x + (SCALE_SIZE * 2.5);
    drawHangman(x, y, true, true, true, true, false, false);
    // Right Leg
    x = x + (SCALE_SIZE * 2.5);
    drawHangman(x, y, true, true, true, true, true, false);
    // Left Leg
    x = x + (SCALE_SIZE * 2.5);
    drawHangman(x, y, true, true, true, true, true, true);

}

function drawHangman(x, y, showHead, showBody, showRightArm, showLeftArm, showRightLeg, showLeftLeg) {
    let isDead = (showHead && showBody && showRightArm && showLeftArm && showRightLeg && showLeftLeg);
    
    // x, y is center of the top of the hat.
    let headX, headY;
    // neck = SCALE_SIZE / 6    = 8
    // head = SCALE_SIZE        = 48
    // brim = SCALE_SIZE / 8    = 6
    // hat SCALE_SIZE / 2       = 24
    //                          = 212 / 48
    headX = x;
    headY = y + SCALE_SIZE / 6; // Add the neck
    headY = headY + SCALE_SIZE; // Add the head
    headY = headY + SCALE_SIZE / 8; // Add the brim of the hat
    headY = headY + SCALE_SIZE / 2; // Add the hat
    if (showHead) {
        drawHead(headX, headY, isDead);
    }

    if (showBody) {
        drawBody(headX, headY)
    }

    if (showRightArm) {
        drawRightArm(headX - SCALE_SIZE / 2, headY);
    }

    if (showLeftArm) {
        drawLeftArm(headX + SCALE_SIZE / 2, headY);
    }

    if (showRightLeg) {
        drawRightLeg(headX - SCALE_SIZE / 2, headY + (1.75 * SCALE_SIZE));
    }

    if (showLeftLeg) {
        drawLeftLeg(headX + SCALE_SIZE / 2, headY + (1.75 * SCALE_SIZE));
    }
}

function drawHead(x, y, isDead) {
    let x1, y1, x2, y2, w, h;

    // draw neck
    ctx.fillStyle = "peachpuff";    
    w = SCALE_SIZE / 3;
    h = w / 2;
    x1 = x - (SCALE_SIZE / (3 * 2))
    y1 = y - h;
    ctx.fillRect(x1, y1, w, h);

    if (isDead) {
        // Draw the noose.
        ctx.strokeStyle = "lightslategray";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 + w, y1 + h);
        ctx.moveTo(x1 + w, y1);
        ctx.lineTo(x1, y1 + h)
        ctx.stroke();
    }


    // draw the head
    w = SCALE_SIZE;
    h = SCALE_SIZE;
    y1 = y - SCALE_SIZE - (SCALE_SIZE / 6);
    x1 = x - (SCALE_SIZE / 2);
    ctx.fillRect(x1, y1, w, h);

    // draw the cowboy hat
    ctx.strokeStyle = "saddlebrown";
    ctx.fillStyle = "saddlebrown";
    h = SCALE_SIZE / 8;
    w = SCALE_SIZE * 2;
    x1 = x1 - (SCALE_SIZE / 2);
    y1 = y1 - h;
    ctx.fillRect(x1, y1, w, h); // brim
    
    y1 = y1 - (SCALE_SIZE / 2);
    x1 = x1 + (SCALE_SIZE / 2);
    h = (SCALE_SIZE / 2);
    w = SCALE_SIZE;
    ctx.fillRect(x1, y1, w, h);

    // draw the nose
    y1 = y - (SCALE_SIZE / 6) - (2 * SCALE_SIZE / 3);
    x1 = x;
    ctx.strokeStyle = "black";
    h = (SCALE_SIZE / 4);
    w = h / 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1, y1 + h);
    ctx.lineTo(x1 - w, y1 + h);
    ctx.stroke();
 
    if (isDead) {
        // Draw dead eyes and mouth.
        x2 = x1 - (SCALE_SIZE / 4);
        y2 = y1;
        w = SCALE_SIZE / 16;
        ctx.beginPath();
        ctx.moveTo(x2 - w, y2 - w);
        ctx.lineTo(x2 + w, y2 + w);
        ctx.moveTo(x2 + w, y2 - w);
        ctx.lineTo(x2 - w, y2 + w);

        x2 = x2 + (SCALE_SIZE / 2);
        ctx.moveTo(x2 - w, y2 - w);
        ctx.lineTo(x2 + w, y2 + w);
        ctx.moveTo(x2 + w, y2 - w);
        ctx.lineTo(x2 - w, y2 + w);

        ctx.stroke();
        // Mouth
        x2 = x1 - (SCALE_SIZE) / 4;
        y2 = y1 + (SCALE_SIZE) / 2;
        x1 = x2 + (SCALE_SIZE / 2);
        w = SCALE_SIZE / 16;
        h = w;
        ctx.beginPath();
        ctx.moveTo(x2, y2);
        for (let i = x2 + w; i < x1; i+= w) {
            h = h * -1;
            ctx.lineTo(i, y2 + h);
        }
        ctx.moveTo(x1, y2);
        ctx.stroke();
    } else {

        // Draw live eyes and mouth.
        // Left eye
        x2 = x1 - (SCALE_SIZE / 4);
        y2 = y1;
        w = SCALE_SIZE / 16;

        ctx.strokeStyle = "black";
        ctx.fillStyle = "white"
        //ctx.moveTo(x2, y2);
        ctx.beginPath();
        ctx.arc(x2, y2, w, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();

        // Pupil
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(x2, y2, w / 2, 0, 2 * Math.PI);
        ctx.fill();

        // Right eye
        x2 = x2 + SCALE_SIZE / 2;
        ctx.strokeStyle = "black";
        ctx.fillStyle = "white";
        //ctx.moveTo(x2, y2);
        ctx.beginPath();
        ctx.arc(x2, y2, w, 0, 2 * Math.PI);
        ctx.stroke()
        ctx.fill();

        // Pupil
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(x2, y2, w / 2, 0, 2 * Math.PI);
        ctx.fill();


        // Mouth
        x2 = x2 - (SCALE_SIZE) / 2;
        y2 = y1 + (SCALE_SIZE * 7) / 16;
        x1 = x2 + (SCALE_SIZE / 2);
        y1 = y2;
        ctx.strokeStyle = "black";
        ctx.moveTo(x2, y2);
        ctx.lineTo(x1, y1);
        ctx.stroke();

    }
}

function drawBody(x, y) {
    let w = SCALE_SIZE;
    let x1 = x - (w / 2);
    let y1 = y;
    let h = SCALE_SIZE * 1.5;
    ctx.fillStyle = "firebrick";
    ctx.fillRect(x1, y1, w, h);
    y1 = y1 + h;
    ctx.fillStyle = "royalblue";
    ctx.fillRect(x1, y1, w, h / 4);
}

function drawRightLeg(x, y) {
    let w = SCALE_SIZE / 3;
    let h = SCALE_SIZE;
    let x1 = x;
    let y1 = y;

    // Leg
    ctx.fillStyle = "royalblue";
    ctx.fillRect(x1, y1, w, h);

    // Boot
    y1 = y1 + h;
    ctx.fillStyle = "saddlebrown";
    ctx.fillRect(x1, y1, w, h);

    x1 = x1 + w;
    y1 = y1 + h;
    w = SCALE_SIZE / 2;
    h = SCALE_SIZE / 4;

    // Foot
    ctx.fillRect(x1 - w, y1 - h, w, h);
}

function drawLeftLeg(x, y) {
    let w = SCALE_SIZE / 3;
    let h = SCALE_SIZE;
    let x1 = x - w;
    let y1 = y;

    // Leg
    ctx.fillStyle = "royalblue";
    ctx.fillRect(x1, y1, w, h);

    // Boot
    y1 = y1 + h;
    ctx.fillStyle = "saddlebrown";
    ctx.fillRect(x1, y1, w, h);

    x1 = x1;
    y1 = y1 + h;
    w = SCALE_SIZE / 2;
    h = SCALE_SIZE / 4;

    // Foot
    ctx.fillRect(x1, y1 - h, w, h);
}

function drawRightArm(x, y) {
    let w = SCALE_SIZE / 3;
    let x1 = x  - w;
    let h = w;
    let y1 = y;

    ctx.fillStyle = "firebrick";
    ctx.fillRect(x1, y1, w, h);
    w = SCALE_SIZE / 4;
    h = SCALE_SIZE * 1.75;
    ctx.fillRect(x1, y1, w, h);

    ctx.fillStyle = "peachpuff";
    y1 = y1 + h;
    h = w;
    ctx.fillRect(x1, y1, w, h);
    ctx.fillRect(x1, y1, w * 1.25, h / 2);
}

function drawLeftArm(x, y) {
    let w = SCALE_SIZE / 3;
    let x1 = x;
    let h = w;
    let y1 = y;

    ctx.fillStyle = "firebrick";
    // Shoulder
    ctx.fillRect(x1, y1, w, h);

    x1 = x1 + w;
    w = SCALE_SIZE / 4;
    h = SCALE_SIZE * 1.75;
    x1 = x1 - w;
    // Arm
    ctx.fillRect(x1, y1, w, h);

    ctx.fillStyle = "peachpuff";
    y1 = y1 + h;
    h = w;
    ctx.fillRect(x1, y1, w, h);
    ctx.fillRect(x1 - (w / 4), y1, w * 1.25, h / 2);
}
