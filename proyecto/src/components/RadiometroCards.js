import React, { useEffect, useContext } from "react";
import {
  getRadiometroResponse,
  getRadiometroData,
} from "../data/getRadiometro";
import { AppContext } from "../context/AppContext";
import Card from "./Card";

function RadiometroCards({ initial_date, final_date }) {
  const { radiometroData, setRadiometroData, getFilteredData } =
    useContext(AppContext);

  const radiometroResponse = () => {
    getRadiometroResponse().then((res) => {
      setRadiometroData(
        getFilteredData(getRadiometroData(res), initial_date, final_date)
      );
    });
  };

  useEffect(() => {
    radiometroResponse();
  }, []);

  return (
    <div className="grid xl:grid-cols-5 sm:grid-cols-3 grid-flow-row h-fit w-full place-items-center place-content-center gap-5 p-5">
      {!radiometroData
        ? "Cargando..."
        : Object.keys(radiometroData).map((key) => {
            return <Card key={key} cardkey={key} type="radiometro" />;
          })}
    </div>
  );
}

export default RadiometroCards;
