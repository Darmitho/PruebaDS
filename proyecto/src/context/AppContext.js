import React, { createContext, useState, useRef } from "react";
import moment from "moment";

export const AppContext = createContext();
export function AppContextProvider({ children }) {
  const [radonData, setRadonData] = useState();
  const [mageeData, setMageeData] = useState();
  const [maapData, setMaapData] = useState();
  const [radiometroData, setRadiometroData] = useState();
  const [multiData, setMultiData] = useState();
  const [grimmData, setGrimmData] = useState();
  const [currentSensor, setCurrentSensor] = useState("");
  const [requiredSensor, setRequiredSensor] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [loginModalOpen, setLoginModalOpen] = useState(true);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  const sensorInputRef = useRef(null);
  const initialDateRef = useRef(null);
  const finalDateRef = useRef(null);

  const getCredentials = async (email, password, url) => {
    try {
      const response = await fetch(
        url + "?correo=" + email + "&contraseña=" + password
      );
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const sensors = {
    radon: "Sensor de Radon",
    multiparametro: "Sensor Multiparametro",
    "bc-magee": "Sensor BC-Magee ( Black Carbon )",
    "bc-maap": "Sensor BC-MAAP ( Black Carbon )",
    radiometro: "Sensor Radiómetro",
    "mp-grimm": "Sensor MP-Grimm",
  };

  const dateformats = {
    radon: "MM/DD/YYYY HH:mm",
    multiparametros: "YYYY-MM-DD HH:mm:ss",
    "bc-magee": "YYYY/MM/DD",
    "bc-maap": "YY/MM/DD",
  };

  const getFilteredData = (data, initial_date, final_date) => {
    const asArray = Object.entries(data);

    const filtered = asArray.filter(
      ([key, value]) =>
        moment(value["Fecha"], dateformats[requiredSensor]).diff(
          initial_date
        ) >= 0 &&
        final_date.diff(moment(value["Fecha"], dateformats[requiredSensor])) >=
          0
    );

    // Convert the key/value array back to an object:
    // `{ name: 'Luke Skywalker', title: 'Jedi Knight' }`
    return Object.fromEntries(filtered);
  };

  const value = {
    radonData,
    mageeData,
    maapData,
    radiometroData,
    multiData,
    grimmData,
    setRadonData,
    setMageeData,
    setMaapData,
    setRadiometroData,
    setMultiData,
    setGrimmData,
    sensorInputRef,
    initialDateRef,
    finalDateRef,
    sensors,
    currentSensor,
    setCurrentSensor,
    requiredSensor,
    setRequiredSensor,
    getFilteredData,
    currentUser,
    setCurrentUser,
    loginModalOpen,
    setLoginModalOpen,
    signUpModalOpen,
    setSignUpModalOpen,
    getCredentials
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
