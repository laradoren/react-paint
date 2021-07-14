import React, {useEffect, useRef} from 'react';
import './../styles/canvas.scss'
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import ModalWindow from "./Modal";
import {useParams} from "react-router-dom";
import Square from "../tools/Square";
import axios from "axios";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";

const Canvas = observer(() => {
    const canvasRef = useRef();
    const params = useParams();

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current);
        let ctx = canvasRef.current.getContext('2d');
        axios.get(`http://localhost:5000/image?id=${params.id}`)
            .then(response => {
                const img = new Image();
                img.src = response.data;
                img.onload = () => {
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
                }
            })
    }, []);


    useEffect(() => {
        if(canvasState.username) {
            const socket = new WebSocket(`ws://localhost:5000/`);
            canvasState.setSocket(socket);
            canvasState.setSessionId(params.id);
            toolState.setTool(new Brush(canvasRef.current, socket, params.id));
            socket.onopen = () => {
                socket.send(JSON.stringify({
                    id: params.id,
                    username: canvasState.username,
                    method: "connection"
                }))
            }
            socket.onmessage = (event) => {
                let msg = JSON.parse(event.data);
                switch (msg.method) {
                    case "connection":
                        console.log(`User ${msg.username} connected`);
                        break;
                    case "draw":
                        drawHandler(msg);
                        break;
                }
            }
        } else {
            return <ModalWindow />
        }

    }, [canvasState.username])

    const mouseDownHandler = () => {
        canvasState.pushToUndoList(canvasRef.current.toDataURL());
        axios.post(`http://localhost:5000/image?id=${params.id}`, {img: canvasRef.current.toDataURL()})
            .then(response => console.log(response.data))
    }

    const drawHandler = (msg) => {
        const figure = msg.figure;
        const ctx = canvasRef.current.getContext('2d');
        switch (figure.type) {
            case "brush":
                Brush.draw(ctx, figure.x, figure.y, figure.color);
                break;
            case "square":
                Square.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color);
                break;
            case "circle":
                Circle.staticDraw(ctx, figure.x, figure.y, figure.radius, figure.color);
                break;
            case "eraser":
                Eraser.draw(ctx, figure.x, figure.y);
                break;
            case "line":
                Line.staticDraw(ctx, figure.x1, figure.y1, figure.x2, figure.y2, figure.color);
                break;
            case "finish":
                ctx.beginPath();
                break;
        }
    }

    return (
        <div className="canvas">
            <ModalWindow />
            <canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={2000} height={1000}/>
        </div>
    );
});

export default Canvas;