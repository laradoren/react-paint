import React from 'react';
import undo from './../assets/images/left.svg';
import redo from './../assets/images/right.svg';
import save from './../assets/images/diskette.svg';
import './../styles/header.scss';
import canvasState from "../store/canvasState";

const Header = () => {
    const download = () => {
        const dataUrl = canvasState.canvas.toDataURL();
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = canvasState.sessionId + ".jpg";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <div className="header">
            <div className="header__inner">
                <div className="header__text">Paint</div>
                <div className="header__middle">
                    <div className="header__text">Picture</div>
                </div>
                <div className="header__right">
                    <img src={undo} alt="icon" className="header__icon" onClick={() => canvasState.undo()}/>
                    <img src={redo} alt="icon" className="header__icon" onClick={() => canvasState.redo()}/>
                    <img src={save} alt="icon" className="header__icon" onClick={() => download()}/>
                </div>
            </div>
        </div>
    );
};

export default Header;