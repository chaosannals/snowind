export default class Snow {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
        this.resize();
        this.respeed();
        this.redirect();
        this.reopacity();
    }

    renderer(canvas, context, interval) {
        let width = canvas.width;
        let height = canvas.height;
        if (this.x >= 0 && this.x <= width) {
            this.x += Math.ceil(this.dx * this.speed * interval);
        } else {
            this.retrieve(width);
        }
        if (this.y >= 0 && this.y <= height) {
            this.y += Math.ceil(this.dy * this.speed * interval);
        } else {
            this.retrieve(width);
        }
        context.font = `${this.size}px bold 黑体`;
        context.fillStyle = `#fff${this.opacity}`;
        context.fillText('❆', this.x, this.y);
    }

    reopacity() {
        let opacity = 3 + Math.floor(Math.random() * 10)
        this.opacity = opacity.toString(16);
    }

    redirect() {
        this.direction = Math.PI * Math.random();
        this.dx = Math.cos(this.direction);
        this.dy = Math.sin(this.direction);
    }

    respeed() {
        this.speed = Math.random() * 0.05;
    }

    resize() {
        this.size = Math.floor(12 + Math.random() * 10);
    }

    retrieve(width) {
        this.resize();
        this.respeed();
        this.redirect();
        this.reopacity();
        this.reposition(width);
    }

    reposition(width) {
        this.x = Math.floor(Math.random() * width);
        this.y = 0;
    }
}