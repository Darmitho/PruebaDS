import { getToken } from "./getToken.js";

export const getMaapResponse = async () => {
  try {
    const response = await fetch(
      "http://18.214.103.65:8080/api/plugins/telemetry/DEVICE/6a4dd7a0-4550-11ed-b4b1-1bcb8f5daa77/values/timeseries?keys=fecha,hora,BC&startTs=1265046352083&endTs=1665044739122",
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

export const getMaapData = (response) => {
  const data = {};
  const dates = response["fecha"];
  dates.forEach((date) => {
    data[date["ts"]] = { Fecha: date["value"] };
  });
  const times = response["hora"];
  times.forEach((time) => {
    data[time["ts"]]["hora"] = time["value"];
  });
  const messures = response["BC"];
  messures.forEach((messure) => {
    data[messure["ts"]]["BC"] = messure["value"];
  });
  return data;
};
