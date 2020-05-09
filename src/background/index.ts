import Snow from './snow';
import {getQueryVariable} from '../utils';

const canvas: HTMLCanvasElement = document.querySelector("#back-visual");
let ctx: CanvasRenderingContext2D;

const amount = getQueryVariable('snow') ? getQueryVariable('snow') : 130;
const fps = 30;
const blur = getQueryVariable('blur');
let curBlur = 0;
let curFrame = 0;
let snow: Snow = null;
let fpsInterval, startTime, now, then, elapsed;

var background = new Image();
background.src = "images/background.gif";

function scaleToFit(img){
    var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    var x = (canvas.width / 2) - (img.width / 2) * scale;
    var y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

const animate = () => {
    requestAnimationFrame(animate);

    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        curFrame++;

        snow.update();

        then = now - (elapsed % fpsInterval);
        
        if(blur && blur != '0'){
            ctx.filter = `blur(${curBlur}px)`;
        
            if(curBlur < parseFloat(blur) && curFrame > (0.15*fps)){
                curBlur += parseFloat(blur) / (0.7*fps);
            }
        }
        
        const ratioH = canvas.height / background.height;
        const ratioW = canvas.width / background.width;
        const scale = ratioW > ratioH ? ratioW : ratioH;
        
        const x = (canvas.width / 2) - (background.width / 2) * scale;
        const y = (canvas.height / 2) - (background.height / 2) * scale;

        ctx.drawImage(background, x, y, background.width * scale, background.height * scale);
        
        ctx.fillStyle = "rgba(9,2,20,0.4)";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        snow.draw();
    }
}

if (canvas.getContext('2d')) {
    ctx = canvas.getContext('2d');
    snow = new Snow(ctx, amount);
    
    window.addEventListener('resize', () => {
        setCanvasSize();
        snow = new Snow(ctx, amount);
    });
    
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;

    animate();

} else {
    console.error("canvas not surported");
}

const setCanvasSize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(canvas.width);
    console.log(canvas.height);
}

setCanvasSize();