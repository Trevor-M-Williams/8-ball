class PowerBar {
    constructor(x, y, w, h) {
        this.pos = createVector(x, y);
        this.w = w;
        this.h = h;
        this.power = 0;
    }

    show() {
        fill(255);
        rect(this.pos.x, this.pos.y, this.w, this.h);
        fill(255, 0, 0);
        rect(this.pos.x, this.pos.y + this.h - this.h * this.power / 100, this.w, this.h * this.power / 100);
    }

    update() {
        this.power = power * 5/3;
        if (this.power > 100) this.power = 100;
    }
}