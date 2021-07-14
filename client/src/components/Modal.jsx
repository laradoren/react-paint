import React, {useState, useRef, useEffect} from 'react';
import {Button, Modal} from "react-bootstrap";
import canvasState from "../store/canvasState";

const ModalWindow = () => {
    const usernameRef = useRef();
    const [modal, setModal] = useState(true);


    const handleClose = () => {
        canvasState.setUsername(usernameRef.current.value);
        setModal(false);
    }

    return (
            <Modal show={modal} onHide={() => setModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Please enter your name:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" ref={usernameRef}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
    );
};

export default ModalWindow;