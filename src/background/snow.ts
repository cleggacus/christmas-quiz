interface SnowParticle{
    x: number;
    y: number;
    xs: number;
    ys: number;
    r: number;
    o: number;
}

class Snow{
    ctx: CanvasRenderingContext2D;
    amount: number;
    snow: SnowParticle[];

    constructor(ctx: CanvasRenderingContext2D, amount: number){
        this.ctx = ctx;
        this.amount = amount;
        this.snow = [];
        this.generate();
    }

    generate(){
        const canvW = this.ctx.canvas.clientWidth;
        const canvH = this.ctx.canvas.clientHeight;
        const amount = (this.amount * canvW * canvH) / (1920*1080);

        this.snow = [];

        for(let i = 0; i < amount; i++){
            this.snow[i] = <SnowParticle>{
                x: (Math.random() * canvW * 2) - canvW,
                y: Math.random() * canvH,
                xs: (Math.random() * 2) + 9,
                ys: (Math.random() * 4) + 7,
                r: (Math.random() * 5) + 1,
                o: Math.random()
            }
        }
    }

    draw(){
        const canvW = this.ctx.canvas.clientWidth;
        const canvH = this.ctx.canvas.clientHeight;
        const amount = (this.amount * canvW * canvH) / (1920*1080);
        
        for(let i = 0; i < amount; i++){
            this.ctx.beginPath();
            this.ctx.arc(this.snow[i].x, this.snow[i].y, this.snow[i].r, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${this.snow[i].o})`;
            this.ctx.fill();
        }
    }

    update(){
        const canvW = this.ctx.canvas.clientWidth;
        const canvH = this.ctx.canvas.clientHeight;
        const amount = (this.amount * canvW * canvH) / (1920*1080);

        for(let i = 0; i < amount; i++){
            this.snow[i].x += this.snow[i].xs;
            this.snow[i].y += this.snow[i].ys;

            if(this.snow[i].y > canvH){
                this.snow[i].x = (Math.random() * canvW * 2) - canvW;
                this.snow[i].y = 0;
            }
        }
    }
}

export default Snow;