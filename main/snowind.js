import Snow from './snow.js';

// 设置帧函数
const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    (callback => window.setTimeout(callback, 1000 / 60));

/**
 * 主类
 * 
 */
export default class Snowind {
    /**
     * 初始化，一开始只初始化 7 成雪花。
     * 
     * @param {*} canvas 画布
     * @param {*} count 雪花总数
     */
    constructor(canvas, count) {
        this.count = count;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.context.fillStyle = '#fff';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.time = new Date().getTime();
        this.snows = [];
        this.setting = {
            sizeMin: 12,
            sizeMax: 20,
            speedMin: 80,
            speedMax: 300,
        };
        this.produce(count * 0.7);
        this.renderer();
    }

    /**
     * 重设数量。
     * 
     * @param {*} count 
     */
    reset(count) {
        this.count = count;
    }

    /**
     * 重置大小范围。
     * 
     * @param {*} min 
     * @param {*} max 
     */
    resize(min, max) {
        this.setting.sizeMin = min;
        this.setting.sizeMax = max;
    }

    /**
     * 重置速度范围。
     * 
     * @param {*} min 
     * @param {*} max 
     */
    respeed(min, max) {
        this.setting.speedMin = min;
        this.setting.speedMax = max;
    }

    /**
     * 生成雪花。
     * 
     * @param {*} count 
     */
    produce(count) {
        for (let i = 0; i <= count; ++i) {
            let x = Math.floor(Math.random() * this.canvas.width);
            let y = Math.floor(Math.random() * this.canvas.height);
            this.snows.push(new Snow(this.setting, x, y));
        }
    }

    /**
     * 帧刷新。
     * 
     */
    renderer() {
        let now = new Date().getTime();
        let interval = (now - this.time) / 1000;
        let canvas = this.canvas;
        let context = this.context;
        let width = canvas.width;
        let height = canvas.height;

        // 时间更新。
        this.time = now;

        // 清屏。
        context.clearRect(0, 0, width, height);

        // 确保雪花数量。
        if (this.snows.length < this.count && Math.random() > 0.5) {
            let x = Math.floor(Math.random() * width);
            this.snows.push(new Snow(this.setting, x));
        }

        // 雪花动画刷新。
        for (let snow of this.snows) {
            if (snow.able) {
                snow.renderer(canvas, context, interval);
            } else if (this.snows.length <= this.count) {
                snow.retrieve(width);
            }
        }

        // 回收阶段。
        if (this.snows.length > this.count) {
            this.snows = this.snows.filter(i => i.able);
        }
        requestAnimationFrame(() => this.renderer());
    }
}