import React, { useState, useContext, useRef } from "react";
import Modal from "./Modal";
import { AppContext } from "../context/AppContext";

function SignUp() {
  const { currentUser, setCurrentUser, signUpModalOpen, setSignUpModalOpen } =
    useContext(AppContext);

  const mailInputRef = useRef();
  const passInputRef = useRef();
  const nameInputRef = useRef();
  const rolInputRef = useRef();
 

  const send = (correo, contraseña, nombre, rol) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            correo,
            contraseña,
            nombre,
            rol
         })
    };

    fetch("http://localhost:4000/register", requestOptions).then(response => response.json()).then((res => setCurrentUser({
        user: res.usuario.nombre,
        password: res.usuario.contraseña,
    }))).then(setSignUpModalOpen(false))
   
  }

  return (
    <Modal active={signUpModalOpen}>
      <form
        
        target="http://localhost:3000"
        method="POST"
        className="flex flex-col place-content-center items-center gap-3 w-[20%] h-fit rounded shadow-xl p-10 bg-slate-50"
      >
        <input
          name="correo"
          type="email"
          required
          ref={mailInputRef}
          placeholder="Correo electronico"
          className="text-center bg-slate-200 p-3 w-full"
        />
        <input
          name="contraseña"
          type="password"
          required
          ref={passInputRef}
          placeholder="Password"
          className="text-center bg-slate-200 p-3 w-full"
        />
        <input
          name="nombre"
          type="text"
          required
          ref={nameInputRef}
          placeholder="Usuario"
          className="text-center bg-slate-200 p-3 w-full"
        />
        <input
          name="rol"
          type="text"
          ref={rolInputRef}
          placeholder="Rol"
          className="text-center bg-slate-200 p-3 w-full"
        />
        <input
          name="send"
          type="button"
          onClick={() => send(mailInputRef.current.value, passInputRef.current.value, nameInputRef.current.value, rolInputRef.current.value)}
          value="Sign-up"
          className="p-3 rounded bg-gray-200 w-full active:bg-gray-400 active:text-white opacity-80 hover:opacity-100 transition-colors cursor-pointer"
        />
      </form>
    </Modal>
  );
}

export default SignUp;
