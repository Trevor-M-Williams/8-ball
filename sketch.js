let balls = [];
let pockets = [];
let cue;
let powerBar;
let power = 0;
let boost = 1;

function setup() {
    let canvas = createCanvas(600, 350);
    let dx = (windowWidth - width) / 2;
    let dy = (windowHeight - height) / 2;
    canvas.position(dx, dy);

    let bps = [
        [50, height / 2],
        [width - 60, height / 2 - 40],
        [width - 60, height / 2 - 20],
        [width - 60, height / 2],
        [width - 60, height / 2 + 20],
        [width - 60, height / 2 + 40],
        [width - 78, height / 2 - 30],
        [width - 78, height / 2 - 10],
        [width - 78, height / 2 + 10],
        [width - 78, height / 2 + 30],
        [width - 96, height / 2 - 20],
        [width - 96, height / 2],
        [width - 96, height / 2 + 20],
        [width - 114, height / 2 - 10],
        [width - 114, height / 2 + 10],
        [width - 132, height / 2],
    ];

    for (let i = 0; i < bps.length; i++) {
        let x = bps[i][0];
        let y = bps[i][1];
        let color;
        if (i === 0) color = [255, 255, 255];
        else if (!(i % 2)) color = [0, 200, 200];
        else if (i === 11) color = [0, 0, 0];
        else color = [0, 100, 100];
        balls.push(new Ball(x, y, color, i));
    }

    cue = balls[0];
    cue.cue = true;

    let delta = 10;
    let pps = [
        [delta, delta],
        [width / 2, delta],
        [width - delta, delta],
        [delta, height - delta],
        [width / 2, height - delta],
        [width - delta, height - delta],
    ];

    for (let i = 0; i < pps.length; i++) {
        let x = pps[i][0];
        let y = pps[i][1];
        pockets.push(new Pocket(x, y));
    }

    let w = 15;
    let h = 200;
    let x = 5;
    let y = (height - h) / 2;
    powerBar = new PowerBar(x, y, w, h);    
}

function draw() {
    background(0, 150, 200);

    if (mouseIsPressed && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        power++;
        powerBar.show();
        powerBar.update();
    }

    for (let i = 0; i < pockets.length; i++) {
        pockets[i].show();
    }
    
    for (let i = 0; i < balls.length; i++) {
        balls[i].update();
        balls[i].show();
        balls[i].checkPockets();

        if (i !== balls.length - 1) {
            for (let j = i + 1; j < balls.length; j++) {
                balls[i].detectCollision(balls[j]);
            }   
        }     
    }
}

function mouseReleased() {
    let mouse = createVector(mouseX, mouseY);
    let newVel = p5.Vector.sub(mouse, cue.pos).setMag(power * boost);
    cue.vel.set(newVel).limit(100 * boost);
    power = 0;
}