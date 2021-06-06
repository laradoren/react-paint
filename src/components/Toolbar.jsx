import React from 'react';
import brush from './../assets/images/big-paint-brush.svg';
import square from './../assets/images/rounded-black-square-shape.svg';
import circle from './../assets/images/dry-clean.svg'
import eraser from './../assets/images/eraser.svg';
import line from './../assets/images/diagonal-line.svg';
import  './../styles/toolbar.scss';

const Toolbar = () => {
    return (
        <div className="toolbar">
            <div className="toolbar__inner">
                <img src={brush} className="toolbar__icon"/>
                <img src={square} className="toolbar__icon"/>
                <img src={circle} className="toolbar__icon"/>
                <img src={eraser} className="toolbar__icon"/>
                <img src={line} className="toolbar__icon"/>
                <input type="color"/>
            </div>
        </div>
    );
};

export default Toolbar;