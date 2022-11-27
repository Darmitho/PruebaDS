import React, { useEffect, useContext } from "react";
import { getMageeResponse, getMageeData } from "../data/getMagee";
import { AppContext } from "../context/AppContext";
import Card from "./Card";

function RadiometroCards({ initial_date, final_date }) {
  const { mageeData, setMageeData, getFilteredData } = useContext(AppContext);

  const mageeResponse = () => {
    getMageeResponse().then((res) => {
      setMageeData(
        getFilteredData(getMageeData(res), initial_date, final_date)
      );
    });
  };

  useEffect(() => {
    mageeResponse();
  }, []);

  return (
    <div className="grid xl:grid-cols-5 sm:grid-cols-3 grid-flow-row h-fit w-full place-items-center place-content-center gap-5 p-5">
      {!mageeData
        ? "Cargando..."
        : Object.keys(mageeData).map((key) => {
            return <Card key={key} cardkey={key} type="magee" />;
          })}
    </div>
  );
}

export default RadiometroCards;
