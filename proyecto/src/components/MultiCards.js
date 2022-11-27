import React, { useEffect, useContext } from "react";
import { getMultiResponse, getMultiData } from "../data/getMultiparametros";
import { AppContext } from "../context/AppContext";
import Card from "./Card";

function MultiCards({ initial_date, final_date }) {
  const { multiData, setMultiData, getFilteredData } = useContext(AppContext);

  useEffect(() => {
    getMultiResponse().then((res) => {
      setMultiData(
        getFilteredData(getMultiData(res), initial_date, final_date)
      );
    });
  }, []);

  return (
    <div className="grid xl:grid-cols-5 sm:grid-cols-3 grid-flow-row h-fit w-full place-items-center place-content-center gap-5 p-5">
      {!multiData
        ? "Cargando..."
        : Object.keys(multiData).map((key) => {
            return <Card key={key} cardkey={key} type="multiparametros" />;
          })}
    </div>
  );
}

export default MultiCards;
