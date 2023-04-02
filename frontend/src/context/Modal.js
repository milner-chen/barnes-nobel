import { createContext, useRef } from "react";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
    const modalRef = useRef();
    // 
    <>
        <ModalContext.Provider>
            { children }
        </ModalContext.Provider>
        <div ref={modalRef}>
            <h1>Modal Content</h1>
        </div>
    </>
}

export default ModalProvider;