import Tool from "./Tool";

export default class Line extends Tool {
    constructor(canvas) {
        super(canvas);
        this.listen();
    }

    listen() {
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    }

    mouseMoveHandler(e) {
        if(this.mouseDown) {
            this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
        }
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
    }

    mouseDownHandler(e){
        this.mouseDown = true;
        this.currentX = e.pageX - e.target.offsetLeft;
        this.currentY = e.pageY - e.target.offsetTop;
        this.ctx.beginPath();
        this.ctx.moveTo(this.currentX, this.currentY);
        this.saved = this.canvas.toDataURL();

    }

    draw(x, y) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.moveTo(this.currentX, this.currentY);
            this.ctx.lineTo(x,y);
            this.ctx.stroke();
        }

    }
}