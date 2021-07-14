import React from 'react';
import brush from './../assets/images/big-paint-brush.svg';
import square from './../assets/images/rounded-black-square-shape.svg';
import circle from './../assets/images/dry-clean.svg'
import eraser from './../assets/images/eraser.svg';
import line from './../assets/images/diagonal-line.svg';
import  './../styles/toolbar.scss';
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import canvasState from "../store/canvasState";
import Square from "../tools/Square";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";

const Toolbar = () => {

    const changeColor = (e) => {
        toolState.setStrokeColor(e.target.value);
        toolState.setFillColor(e.target.value);
    }

    return (
        <div className="toolbar">
            <div className="toolbar__inner">
                <img src={brush} alt="icon" className="toolbar__icon"  onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId))}/>
                <img src={square} alt="icon" className="toolbar__icon" onClick={() => toolState.setTool(new Square(canvasState.canvas, canvasState.socket, canvasState.sessionId))}/>
                <img src={circle} alt="icon" className="toolbar__icon" onClick={() => toolState.setTool(new Circle(canvasState.canvas, canvasState.socket, canvasState.sessionId))}/>
                <img src={line} alt="icon" className="toolbar__icon" onClick = {() => toolState.setTool(new Line(canvasState.canvas, canvasState.socket, canvasState.sessionId))}/>
                <img src={eraser} alt="icon" className="toolbar__icon" onClick = {() => toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket, canvasState.sessionId))}/>
                <div className="toolbar__input-range">
                    <input type="range" min="0" max="20" step="1" defaultValue="1" onChange={ e => toolState.setLineWidth(e.target.value) } />
                </div>
                <input type="color" defaultValue="black" onChange={ e => changeColor(e)} />
            </div>
        </div>
    );
};

export default Toolbar;