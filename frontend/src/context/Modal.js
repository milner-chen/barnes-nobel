import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import './Modal.css';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, []); // run once after initial render

    return (
        <>
            <ModalContext.Provider value={value}>
                { children }
            </ModalContext.Provider>
            <div ref={modalRef}>
                {/* <h1>Modal Content</h1> */}
            </div>
        </>
    )
}

export const Modal = ({ onClose, children }) => {
    const modalNode = useContext(ModalContext);

    if (!modalNode) return null;

    return createPortal(
        <div id="modal">
            <div id="modal-background" onClick={onClose}></div>
            <div id="modal-content">
                <i onClick={onClose} className="fa-solid fa-xmark"></i>
                { children }
            </div>
        </div>, modalNode
    );
}