import { AppContext } from "../context/AppContext";
import RadonCards from "./RadonCards";
import MultiCards from "./MultiCards";
import MageeCards from "./MageeCards";
import MaapCards from "./MaapCards";
import RadiometroCards from "./RadiometroCards";
import GrimmCards from "./GrimmCards";
import React, { useContext } from "react";

function Dispayer() {
  const { requiredSensor } = useContext(AppContext);

  const sensorComponents = (sensor, initial_date, final_date) => {
    const sensors = {
      radon: <RadonCards initial_date={initial_date} final_date={final_date} />,
      multiparametro: (
        <MultiCards initial_date={initial_date} final_date={final_date} />
      ),
      "bc-magee": (
        <MageeCards initial_date={initial_date} final_date={final_date} />
      ),
      "bc-maap": (
        <MaapCards initial_date={initial_date} final_date={final_date} />
      ),
      radiometro: (
        <RadiometroCards initial_date={initial_date} final_date={final_date} />
      ),
      "mp-grimm": (
        <GrimmCards initial_date={initial_date} final_date={final_date} />
      ),
    };
    return sensors[sensor];
  };

  if (requiredSensor) {
    return sensorComponents(
      requiredSensor.sensor,
      requiredSensor.initial_date,
      requiredSensor.final_date
    );
  }
}

export default Dispayer;
