import { AppContextProvider } from "./context/AppContext";
import Formulario from "./components/Formulario";
import Displayer from "./components/Displayer";
import Modal from "./components/Modal";
import Login from "./components/Login";
import SessionInfo from "./components/SessionInfo";
import { useEffect } from "react";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="w-full h-fit bg-slate-200 relative z-0 py-5">
      <AppContextProvider>
        <SessionInfo />
        <Formulario />
        <Displayer />
        <Login url="http://localhost:4000/login" />
        <SignUp />
      </AppContextProvider>
    </div>
  );
}

export default App;
