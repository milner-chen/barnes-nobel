import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import './Modal.css';

const ModalContext = createContext();

// passes the context to the components it wraps
export const ModalProvider = ({ children }) => {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        // modalRef set to the DOM element rendered by the div
        setValue(modalRef.current);
        // value now is the DOM element rendered?
        // this DOM element is then passed onto all components within ModalProvider
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
                <i onClick={onClose} className="fa-solid fa-xmark" style={{cursor: "pointer"}}></i>
                { children }
            </div>
        </div>, modalNode
    );
}