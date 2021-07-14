import Tool from "./Tool";

export default class Brush extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.listen();
    }

    listen() {
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    }

    mouseMoveHandler(e) {
        if(this.mouseDown) {
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'brush',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY- e.target.offsetTop,
                    color: this.ctx.fillStyle
                }
            }))
            //this.draw(e.pageX - e.target.offsetLeft, e.pageY- e.target.offsetTop);
        }
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'finish'
            }
        }))
    }

    mouseDownHandler(e){
        this.mouseDown = true;
        this.ctx.beginPath();
        this.ctx.moveTo(e.pageX- e.target.offsetLeft, e.pageY- e.target.offsetTop);
    }

    static draw(ctx, x, y, color) {
        ctx.fillStyle = color;
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}