import Snow from './snow.js';

const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    (callback => window.setTimeout(callback, 1000 / 60));

export default class Snowind {
    constructor(canvas, count) {
        this.count = count;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.context.fillStyle = '#fff';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.time = new Date().getTime();
        this.snows = [];
        this.produce(count * 0.7);
        this.renderer();
    }

    produce(count) {
        for (let i = 0; i <= count; ++i) {
            let x = Math.floor(Math.random() * this.canvas.width);
            let y = Math.floor(Math.random() * this.canvas.height);
            this.snows.push(new Snow(x, y));
        }
    }

    renderer() {
        let interval = (new Date().getTime() - this.time) / 1000;
        let canvas = this.canvas;
        let context = this.context;
        let width = canvas.width;
        let height = canvas.height;
        context.clearRect(0, 0, width, height);
        if (this.snows.length < this.count) {
            let x = Math.floor(Math.random() * width);
            this.snows.push(new Snow(x));
        }
        for (let snow of this.snows) {
            snow.renderer(canvas, context, interval);
        }
        requestAnimationFrame(() => this.renderer());
    }
}