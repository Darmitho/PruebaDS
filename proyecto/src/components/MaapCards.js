import React, { useEffect, useContext } from "react";
import { getMaapResponse, getMaapData } from "../data/getMaap";
import { AppContext } from "../context/AppContext";
import Card from "./Card";

function MaapCards({ initial_date, final_date }) {
  const { maapData, setMaapData, getFilteredData } = useContext(AppContext);

  const maapResponse = () => {
    getMaapResponse().then((res) => {
      console.log(getMaapData(res));
      setMaapData(getFilteredData(getMaapData(res), initial_date, final_date));
    });
  };

  useEffect(() => {
    maapResponse();
    console.log("maapcards");
  }, []);

  return (
    <div className="grid xl:grid-cols-5 sm:grid-cols-3 grid-flow-row h-fit w-full place-items-center place-content-center gap-5 p-5">
      {!maapData
        ? "Cargando..."
        : Object.keys(maapData).map((key) => {
            return <Card key={key} cardkey={key} type="maap" />;
          })}
    </div>
  );
}

export default MaapCards;
