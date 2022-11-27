import React, { useContext, useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { AppContext } from "../context/AppContext";
function Login({ url }) {
  const {
    currentUser,
    setCurrentUser,
    loginModalOpen,
    setLoginModalOpen,
    setSignUpModalOpen,
    getCredentials
  } = useContext(AppContext);

  const mailInputRef = useRef();
  const passInputRef = useRef();

  

  useEffect(() => {
    currentUser ? setLoginModalOpen(false) : setLoginModalOpen(true);
  }, [currentUser]);

  return (
    <Modal active={loginModalOpen}>
      <form
        action={url}
        target="http://localhost:3000"
        method="GET"
        className="flex flex-col place-content-center items-center gap-3 w-[20%] h-fit rounded shadow-xl p-10 bg-slate-50"
      >
        <input
          name="correo"
          type="email"
          ref={mailInputRef}
          placeholder="Correo electronico"
          className="text-center bg-slate-200 p-3 w-full"
        />
        <input
          name="contraseña"
          type="password"
          ref={passInputRef}
          placeholder="Password"
          className="text-center bg-slate-200 p-3 w-full"
        />
        <section className="flex w-full gap-3">
          <input
            name="send"
            type="button"
            onClick={() =>
              getCredentials(
                mailInputRef.current.value,
                passInputRef.current.value,
                url
              ).then((res) =>
                setCurrentUser({
                  user: res.usuario.nombre,
                  password: res.usuario.id,
                })
              )
            }
            value="Sign-in"
            className="p-3 rounded bg-gray-200 w-full active:bg-gray-400 active:text-white opacity-80 hover:opacity-100 transition-colors cursor-pointer"
          />

          <button
            onClick={() => {
              setLoginModalOpen(false);
              setSignUpModalOpen(true);
            }}
            className="p-3 rounded bg-gray-200 w-full active:bg-gray-400 active:text-white opacity-80 hover:opacity-100 transition-colors cursor-pointer"
          >
            Sign Up
          </button>
        </section>
      </form>
    </Modal>
  );
}

export default Login;

