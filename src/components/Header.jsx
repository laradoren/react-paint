import React from 'react';
import users from './../assets/images/group.svg';
import undo from './../assets/images/left.svg';
import redo from './../assets/images/right.svg';
import save from './../assets/images/diskette.svg';
import './../styles/header.scss';

const Header = () => {
    return (
        <div className="header">
            <div className="header__inner">
                <div className="header__text">Paint</div>
                <div className="header__middle">
                    <img src={users} alt="icon" className="header__icon"/>
                    <div className="header__text">No name</div>
                </div>
                <div className="header__right">
                    <img src={undo} alt="icon" className="header__icon"/>
                    <img src={redo} alt="icon" className="header__icon"/>
                    <img src={save} alt="icon" className="header__icon"/>
                </div>
            </div>
        </div>
    );
};

export default Header;