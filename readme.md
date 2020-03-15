# [snowind](https://github.com/chaosannals/snowind)

基于 Canvas 的雪花效果。

![Demo](https://raw.githubusercontent.com/chaosannals/snowind/master/snowind.gif)

## 使用

引入 build 目录下的 snowind.js 文件，并实例化 Snowind 对象即可。

```html
<script type="text/javascript" charset="utf-8" href="/snowind.js"></script>
```

```js
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
```

## 演示

通过以下命令安装环境。

```bash
npm i
```

通过以下命令行可以调试服务器。

```bash
npm run serve
```
