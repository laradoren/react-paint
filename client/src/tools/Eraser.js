import Tool from "./Tool";

export default class Eraser extends Tool {
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
                    type: 'eraser',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY- e.target.offsetTop
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

    static draw(ctx, x, y) {
        ctx.strokeStyle = "white";
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}