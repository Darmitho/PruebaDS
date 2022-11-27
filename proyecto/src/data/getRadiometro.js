import { getToken } from "./getToken.js";

export const getRadiometroResponse = async () => {
  try {
    const response = await fetch(
      "http://18.214.103.65:8080/api/plugins/telemetry/DEVICE/efdd9590-4550-11ed-b4b1-1bcb8f5daa77/values/timeseries?keys=Fecha,Hora,Albedo&startTs=1265046352083&endTs=1665044947549",
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

export const getRadiometroData = (response) => {
  const data = {};
  const dates = response["Fecha"];
  dates.forEach((date) => {
    data[date["ts"]] = { Fecha: date["value"] };
  });
  const times = response["Hora"];
  times.forEach((time) => {
    data[time["ts"]]["Hora"] = time["value"];
  });
  const messures = response["Albedo"];
  messures.forEach((messure) => {
    data[messure["ts"]]["Albedo"] = messure["value"];
  });
  return data;
};
