import React from "react";

function Data(props) {
  return (
    <div>
      {Object.keys(props.data).forEach((key) => {
        return (
          <>
            <h1>{key}</h1>
            <h2>fecha: {props.data[key]["Fecha"]}</h2>
            <h2>radon: {props.data[key]["Radon"]}</h2>
          </>
        );
      })}
    </div>
  );
}

export default Data;
