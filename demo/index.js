var canvas = document.body.querySelector('canvas');
var snowind = new Snowind(canvas, 200);

function reset() {
    let nextTime = (10 + Math.random() * 20) * 1000;
    let count = 100 + Math.floor(Math.random() * 200);
    let sizeMin = 10 + Math.floor(Math.random() * 5);
    let sizeMax = 20 + Math.floor(Math.random() * 10);
    let speedMin = 80 + Math.floor(Math.random() * 80);
    let speedMax = 100 + Math.floor(Math.random() * 500);
    snowind.reset(count); // 重置雪花数量
    snowind.resize(sizeMin, sizeMax); // 重置雪花大小范围
    snowind.respeed(speedMin, speedMax); // 重置雪花速度范围
    console.log('reset: ', count);
    console.log('resize: ', sizeMin, '-', sizeMax);
    console.log('respeed: ', speedMin, '-', speedMax);
    console.log('next-time: ', nextTime, 'ms');
    setTimeout(reset, nextTime);
}

reset();
