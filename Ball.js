class Ball {
    constructor(x, y, color, id) {
        this.pos = createVector(x,y);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.r = 9;
        this.mass = 1;
        this.color = color;
        this.id = id;
        this.cue = false;
        this.made = false;
        this.switches = [];

        for (let i = 0; i < 15; i++) {
            this.switches[i] = 0;
        }
    }

    checkPockets() {
        for (let i = 0; i < pockets.length; i++) {
            let p = pockets[i];
            let dist = p5.Vector.sub(this.pos, p.pos);
            if (dist.mag() <= p.r) {
                this.made = true;
            }
        }
    }

    detectCollision(other) {
        if ((!this.made || this.cue) && !other.made) {
            let dist = p5.Vector.sub(this.pos, other.pos);
            if (dist.mag() <= this.r * 2) {
                if (!this.switches[other.id]) {
                    other.pos = p5.Vector.add(this.pos, dist.copy().setMag(this.r * 2).mult(-1));
                    let ci = 0.9; // coefficient of inelasticity

                    let dist2 = p5.Vector.sub(other.pos, this.pos);
                    let v1 = this.vel;
                    let v2 = other.vel;

                    let vz = p5.Vector.add(v1, v2).mult(0.5);
                    let v1z = p5.Vector.sub(v1, vz);
                    let v2z = p5.Vector.sub(v2, vz);
                    
                    let collisionAngle = v1z.copy().mult(-1).angleBetween(dist);
                    let collisionAngle2 = v2z.copy().mult(-1).angleBetween(dist2);

                    let v3z = v1z.copy().mult(-1).rotate(collisionAngle * 2);
                    let v4z = v2z.copy().mult(-1).rotate(collisionAngle2 * 2);

                    let v3, v4;
                    if (v1.mag() === 0) v3 = dist.copy().setMag(v1z.mag());
                    else v3 = p5.Vector.add(v3z, vz);
                    if (v2.mag() === 0) v4 = dist2.copy().setMag(v2z.mag());
                    else v4 = p5.Vector.add(v4z, vz);

                    v3.mult(ci);
                    v4.mult(ci);

                    this.vel.set(v3);
                    other.vel.set(v4);

                    this.switches[other.id] = 1;
                }
            } else this.switches[other.id] = 0;
        }
    }

    detectEdges() {
        let cl = 0.65; // loss coefficient

        if (this.pos.x <= this.r) {
            this.pos.x = this.r;
            this.vel.x *= -cl;
        } else if (this.pos.x >= width - this.r) {
            this.pos.x = width - this.r;
            this.vel.x *= -cl;
        } else if (this.pos.y <= this.r) {
            this.pos.y = this.r;
            this.vel.y *= -cl;
        } else if (this.pos.y >= height - this.r) {
            this.pos.y = height - this.r;
            this.vel.y *= -cl;
        }
    }

    show() {
        if (this.cue || !this.made) {
            noStroke();
            fill(this.color);
            circle(this.pos.x, this.pos.y, this.r*2);
            stroke(255);
            strokeWeight(3);
            let arrow = this.vel.copy();
            arrow.mult(10);
            stroke(0, 255, 255);
            line(this.pos.x, this.pos.y, this.pos.x + arrow.x, this.pos.y + arrow.y);
        }
    }

    update() {
        this.vel.mult(0.98);
        if (this.vel.mag() <= 0.1) this.vel.set(0,0);

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.detectEdges();
    }
}