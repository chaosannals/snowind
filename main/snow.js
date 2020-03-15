/**
 * 雪花
 * 
 */
export default class Snow {
    /**
     * 初始化
     * 
     * @param {*} x 初始X坐标
     * @param {*} y 初始Y坐标
     */
    constructor(setting, x, y) {
        this.x = x || 0;
        this.y = y || 0;
        this.able = true;
        this.setting = setting;
        this.resize();
        this.respeed();
        this.redirect();
        this.reopacity();
    }

    /**
     * 渲染
     * 
     * @param {*} canvas 画布
     * @param {*} context 画布上下文
     * @param {*} interval 间隔
     */
    renderer(canvas, context, interval) {
        let width = canvas.width;
        let height = canvas.height;
        this.able = this.x >= 0 && this.x <= width &&
            this.y >= 0 && this.y <= height;
        if (this.able) {
            this.x += this.dx * this.speed * interval;
            this.y += this.dy * this.speed * interval;
            context.font = `${this.size}px bold serif`;
            context.fillStyle = `#fff${this.opacity}`;
            context.fillText('❆', this.x, this.y);
        }
    }

    /**
     * 随机重置透明度。
     * 
     */
    reopacity() {
        let opacity = 3 + Math.floor(Math.random() * 10)
        this.opacity = opacity.toString(16);
    }

    /**
     * 随机重置方向。
     * 
     */
    redirect() {
        this.direction = Math.PI * Math.random();
        this.dx = Math.cos(this.direction);
        this.dy = Math.sin(this.direction);
    }

    /**
     * 随机重置速度。
     * 
     */
    respeed() {
        let min = this.setting.speedMin;
        let limit = this.setting.speedMax - min;
        this.speed = min + Math.random() * limit;
    }

    /**
     * 随机重置大小。
     * 
     */
    resize() {
        let min = this.setting.sizeMin;
        let limit = this.setting.sizeMax - min;
        this.size = min + Math.floor(Math.random() * limit);
    }

    /**
     * 随机重置。
     * 
     * @param {*} width 画布宽度。
     */
    retrieve(width) {
        this.able = true;
        this.resize();
        this.respeed();
        this.redirect();
        this.reopacity();
        this.reposition(width);
    }

    /**
     * 随机重置位置，只从最上开始。
     * 
     * @param {*} width 
     */
    reposition(width) {
        this.x = Math.floor(Math.random() * width);
        this.y = 0;
    }
}