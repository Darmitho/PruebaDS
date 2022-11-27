import React, { useEffect, useContext } from "react";
import { getRadonResponse, getRadonData } from "../data/getRadonData";
import { AppContext } from "../context/AppContext";
import Card from "./Card";

function RadonCards({ initial_date, final_date }) {
  const { radonData, setRadonData, getFilteredData } = useContext(AppContext);

  const radonResponse = () => {
    getRadonResponse().then((res) => {
      setRadonData(
        getFilteredData(getRadonData(res), initial_date, final_date)
      );
    });
  };

  useEffect(() => {
    radonResponse();
  }, []);

  return (
    <div className="grid xl:grid-cols-5 sm:grid-cols-3 grid-flow-row h-fit w-full place-items-center place-content-center gap-5 p-5">
      {!radonData
        ? "Cargando..."
        : Object.keys(radonData).map((key) => {
            return <Card type={"radon"} key={key} cardkey={key} />;
          })}
    </div>
  );
}

export default RadonCards;
