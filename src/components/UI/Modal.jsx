import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ children, open, className = "" }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;

    if (open) {
      modal.showModal();
    }

    return () => modal.close(); // schowa modal jezeli open !== true
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.querySelector("#modal")
  );
}

export default Modal;
