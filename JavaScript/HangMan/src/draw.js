/* 
Hangman.js
*/

import { settings } from './settings';

export function drawHangman(x, y, showHead, showBody, showRightArm, showLeftArm, showRightLeg, showLeftLeg, ctx ) {
    let isDead = (showHead && showBody && showRightArm && showLeftArm && showRightLeg && showLeftLeg);

    // x, y is center of the top of the hat.
    let headX, headY;
    headX = x;
    headY = y + settings.draw.size / 6; // Add the neck
    headY = headY + settings.draw.size; // Add the head
    headY = headY + settings.draw.size / 8; // Add the brim of the hat
    headY = headY + settings.draw.size / 2; // Add the hat
    if (showHead) {
        drawHead(headX, headY, isDead, ctx );
    }

    if (showBody) {
        drawBody(headX, headY, ctx )
    }

    if (showRightArm) {
        drawRightArm(headX - settings.draw.size / 2, headY, ctx );
    }

    if (showLeftArm) {
        drawLeftArm(headX + settings.draw.size / 2, headY, ctx );
    }

    if (showRightLeg) {
        drawRightLeg(headX - settings.draw.size / 2, headY + (1.75 * settings.draw.size), ctx );
    }

    if (showLeftLeg) {
        drawLeftLeg(headX + settings.draw.size / 2, headY + (1.75 * settings.draw.size), ctx );
    }
}

function drawHead(x, y, isDead, ctx ) {
    let x1, y1, x2, y2, w, h;
    
    // draw neck
    ctx.fillStyle = settings.draw.styleSkin;
    w = settings.draw.size / 3;
    h = w / 2;
    x1 = x - (settings.draw.size / (3 * 2))
    y1 = y - h;
    ctx.fillRect(x1, y1, w, h);

    if (isDead) {
        // Draw the noose.
        ctx.strokeStyle = settings.draw.styleNoose;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x1 + w, y1 + h);
        ctx.moveTo(x1 + w, y1);
        ctx.lineTo(x1, y1 + h)
        ctx.stroke();
    }


    // draw the head
    w = settings.draw.size;
    h = settings.draw.size;
    y1 = y - settings.draw.size - (settings.draw.size / 6);
    x1 = x - (settings.draw.size / 2);
    ctx.fillRect(x1, y1, w, h);

    // draw the cowboy hat
    ctx.strokeStyle = settings.draw.styleHat;
    ctx.fillStyle = settings.draw.styleHat;
    h = settings.draw.size / 8;
    w = settings.draw.size * 2;
    x1 = x1 - (settings.draw.size / 2);
    y1 = y1 - h;
    ctx.fillRect(x1, y1, w, h); // brim
    
    y1 = y1 - (settings.draw.size / 2);
    x1 = x1 + (settings.draw.size / 2);
    h = (settings.draw.size / 2);
    w = settings.draw.size;
    ctx.fillRect(x1, y1, w, h);

    // draw the nose
    y1 = y - (settings.draw.size / 6) - (2 * settings.draw.size / 3);
    x1 = x;
    ctx.strokeStyle = settings.stylePen;
    h = (settings.draw.size / 4);
    w = h / 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1, y1 + h);
    ctx.lineTo(x1 - w, y1 + h);
    ctx.stroke();
 
    if (isDead) {
        // Draw dead eyes and mouth.
        ctx.strokeStyle = settings.draw.stylePen;
        x2 = x1 - (settings.draw.size / 4);
        y2 = y1;
        w = settings.draw.size / 16;
        ctx.beginPath();
        ctx.moveTo(x2 - w, y2 - w);
        ctx.lineTo(x2 + w, y2 + w);
        ctx.moveTo(x2 + w, y2 - w);
        ctx.lineTo(x2 - w, y2 + w);

        x2 = x2 + (settings.draw.size / 2);
        ctx.moveTo(x2 - w, y2 - w);
        ctx.lineTo(x2 + w, y2 + w);
        ctx.moveTo(x2 + w, y2 - w);
        ctx.lineTo(x2 - w, y2 + w);

        ctx.stroke();
        // Mouth
        x2 = x1 - (settings.draw.size) / 4;
        y2 = y1 + (settings.draw.size) / 2;
        x1 = x2 + (settings.draw.size / 2);
        w = settings.draw.size / 16;
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

        ctx.strokeStyle = settings.draw.stylePen;
        // Draw live eyes and mouth.
        // Left eye
        x2 = x1 - (settings.draw.size / 4);
        y2 = y1;
        w = settings.draw.size / 16;

        ctx.strokeStyle = settings.draw.stylePen;
        ctx.fillStyle = settings.draw.styleEye;
        //ctx.moveTo(x2, y2);
        ctx.beginPath();
        ctx.arc(x2, y2, w, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();

        // Pupil
        ctx.beginPath();
        ctx.fillStyle = settings.draw.stylePupil;
        ctx.arc(x2, y2, w / 2, 0, 2 * Math.PI);
        ctx.fill();

        // Right eye
        x2 = x2 + settings.draw.size / 2;
        ctx.strokeStyle = settings.draw.stylePen;
        ctx.fillStyle = settings.draw.styleEye;
        //ctx.moveTo(x2, y2);
        ctx.beginPath();
        ctx.arc(x2, y2, w, 0, 2 * Math.PI);
        ctx.stroke()
        ctx.fill();

        // Pupil
        ctx.beginPath();
        ctx.fillStyle = settings.draw.stylePupil;
        ctx.arc(x2, y2, w / 2, 0, 2 * Math.PI);
        ctx.fill();


        // Mouth
        x2 = x2 - (settings.draw.size) / 2;
        y2 = y1 + (settings.draw.size * 7) / 16;
        x1 = x2 + (settings.draw.size / 2);
        y1 = y2;
        ctx.strokeStyle = settings.draw.stylePen;
        ctx.moveTo(x2, y2);
        ctx.lineTo(x1, y1);
        ctx.stroke();

    }
}

function drawBody(x, y, ctx ) {
    let w = settings.draw.size;
    let x1 = x - (w / 2);
    let y1 = y;
    let h = settings.draw.size * 1.5;
    ctx.fillStyle = settings.draw.styleShirt;
    ctx.fillRect(x1, y1, w, h);
    y1 = y1 + h;
    ctx.fillStyle = settings.draw.stylePants;
    ctx.fillRect(x1, y1, w, h / 4);
}

function drawRightLeg(x, y, ctx ) {
    let w = settings.draw.size / 3;
    let h = settings.draw.size;
    let x1 = x;
    let y1 = y;

    // Leg
    ctx.fillStyle = settings.draw.stylePants;
    ctx.fillRect(x1, y1, w, h);

    // Boot
    y1 = y1 + h;
    ctx.fillStyle = settings.draw.styleBoots;
    ctx.fillRect(x1, y1, w, h);

    x1 = x1 + w;
    y1 = y1 + h;
    w = settings.draw.size / 2;
    h = settings.draw.size / 4;

    // Foot
    ctx.fillRect(x1 - w, y1 - h, w, h);
}

function drawLeftLeg(x, y, ctx ) {
    let w = settings.draw.size / 3;
    let h = settings.draw.size;
    let x1 = x - w;
    let y1 = y;

    // Leg
    ctx.fillStyle = settings.draw.stylePants;
    ctx.fillRect(x1, y1, w, h);

    // Boot
    y1 = y1 + h;
    ctx.fillStyle = settings.draw.styleBoots;
    ctx.fillRect(x1, y1, w, h);

    x1 = x1;
    y1 = y1 + h;
    w = settings.draw.size / 2;
    h = settings.draw.size / 4;

    // Foot
    ctx.fillRect(x1, y1 - h, w, h);
}

function drawRightArm(x, y, ctx ) {
    let w = settings.draw.size / 3;
    let x1 = x  - w;
    let h = w;
    let y1 = y;

    ctx.fillStyle = settings.draw.styleShirt;
    ctx.fillRect(x1, y1, w, h);
    w = settings.draw.size / 4;
    h = settings.draw.size * 1.75;
    ctx.fillRect(x1, y1, w, h);

    ctx.fillStyle = settings.draw.styleSkin;
    y1 = y1 + h;
    h = w;
    ctx.fillRect(x1, y1, w, h);
    ctx.fillRect(x1, y1, w * 1.25, h / 2);
}

function drawLeftArm(x, y, ctx ) {
    let w = settings.draw.size / 3;
    let x1 = x;
    let h = w;
    let y1 = y;

    ctx.fillStyle = settings.draw.styleShirt;
    // Shoulder
    ctx.fillRect(x1, y1, w, h);

    x1 = x1 + w;
    w = settings.draw.size / 4;
    h = settings.draw.size * 1.75;
    x1 = x1 - w;
    // Arm
    ctx.fillRect(x1, y1, w, h);

    ctx.fillStyle = settings.draw.styleSkin;
    y1 = y1 + h;
    h = w;
    ctx.fillRect(x1, y1, w, h);
    ctx.fillRect(x1 - (w / 4), y1, w * 1.25, h / 2);
}
