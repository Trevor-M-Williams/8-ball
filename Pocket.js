class Pocket {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.r = 12;
    }

    show() {
        fill(0);
        noStroke();
        circle(this.pos.x, this.pos.y, this.r * 2);
    }
}