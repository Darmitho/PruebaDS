import React, { useEffect, useContext } from "react";
import { getGrimmResponse, getGrimmData } from "../data/getGrimm";
import { AppContext } from "../context/AppContext";
import Card from "./Card";

function GrimmCards({ initial_date, final_date }) {
  const { grimmData, setGrimmData, getFilteredData } = useContext(AppContext);

  const grimmResponse = () => {
    getGrimmResponse().then((res) => {
      setGrimmData(
        getFilteredData(getGrimmData(res), initial_date, final_date)
      );
    });
  };

  useEffect(() => {
    grimmResponse();
  }, []);

  return (
    <div className="grid xl:grid-cols-5 sm:grid-cols-3 grid-flow-row h-fit w-full place-items-center place-content-center gap-5 p-5">
      {!grimmData
        ? "Cargando..."
        : Object.keys(grimmData).map((key) => {
            return <Card key={key} cardkey={key} type="grimm" />;
          })}
    </div>
  );
}

export default GrimmCards;
