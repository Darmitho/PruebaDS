import { getToken } from "./getToken.js";

export const getGrimmResponse = async () => {
  try {
    const response = await fetch(
      "http://18.214.103.65:8080/api/plugins/telemetry/DEVICE/99ce9f80-4557-11ed-b4b1-1bcb8f5daa77/values/timeseries?keys=Fecha,TSP,PM10,PM4,PM2.5,PM1&startTs=1265046352083&endTs=1665048457821",
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": "Bearer " + (await getToken()),
        },
        mode: "cors",
        cache: "default",
      }
    );

    const responseJSON = await response.json();
    return responseJSON;
  } catch (error) {
    console.error(error);
  }
};

export const getGrimmData = (response) => {
  const data = {};
  const dates = response["Fecha"];
  dates.forEach((date) => {
    data[date["ts"]] = { Fecha: date["value"] };
  });
  const tspd = response["TSP"];
  tspd.forEach((tsp) => {
    data[tsp["ts"]]["TSP"] = tsp["value"];
  });
  const pm_10 = response["PM10"];
  pm_10.forEach((messure) => {
    data[messure["ts"]]["PM10"] = messure["value"];
  });
  const pm_4 = response["PM4"];
  pm_4.forEach((messure) => {
    data[messure["ts"]]["PM4"] = messure["value"];
  });
  const pm_25 = response["PM2.5"];
  pm_25.forEach((messure) => {
    data[messure["ts"]]["PM2.5"] = messure["value"];
  });
  const pm_1 = response["PM1"];
  pm_1.forEach((messure) => {
    data[messure["ts"]]["PM1"] = messure["value"];
  });
  return data;
};
