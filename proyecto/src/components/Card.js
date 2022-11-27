import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Card({ cardkey, type }) {
  const {
    radonData,
    multiData,
    maapData,
    mageeData,
    radiometroData,
    grimmData,
  } = useContext(AppContext);

  const data = {
    radon: radonData,
    maap: maapData,
    magee: mageeData,
    radiometro: radiometroData,
    grimm: grimmData,
    multiparametros: multiData,
  };

  const getContent = () => {};

  return (
    <div
      key={cardkey}
      className="rounded-md bg-slate-50 py-5 px-10 shadow-md shadow-slate-400/40 font-semibold w-fit h-fit aspect-video"
    >
      <h1 className="text-xl font-serif font-bold">TS: {cardkey}</h1>
      {!data[type]
        ? "Cargando..."
        : Object.keys(data[type][cardkey]).map((key) => {
            return (
              <h2 className="text-lg" key={key}>
                {key + ": " + data[type][cardkey][key]}
              </h2>
            );
          })}
    </div>
  );
}

export default Card;
