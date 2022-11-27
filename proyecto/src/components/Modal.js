import React, { useState } from "react";
import Portal from "../modal/Portal";

function Modal({ children, toggle, active }) {
  return (
    <Portal>
      {active && (
        <div className="absolute left-0 top-0 w-full h-full p-10 flex place-content-center bg-gray-400 z-30">
          {children}
        </div>
      )}
    </Portal>
  );
}

export default Modal;
