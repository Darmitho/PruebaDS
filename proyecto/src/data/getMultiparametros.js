import { getToken } from "./getToken.js";

export const getMultiResponse = async () => {
  try {
    const response = await fetch(
      "http://18.214.103.65:8080/api/plugins/telemetry/DEVICE/101d2fe0-454d-11ed-b4b1-1bcb8f5daa77/values/timeseries?keys=TIMESTAMP,WS,WD,Temp,RH,BP,Depth &startTs=1265046352083&endTs=1665043961492",
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

export const getMultiData = (response) => {
  const data = {};
  const dates = response["TIMESTAMP"];
  dates.forEach((date) => {
    data[date["ts"]] = { Fecha: date["value"] };
  });
  const ws = response["WS"];
  ws.forEach((messure) => {
    data[messure["ts"]]["WS"] = messure["value"];
  });
  const bp = response["BP"];
  bp.forEach((messure) => {
    data[messure["ts"]]["BP"] = messure["value"];
  });
  const rh = response["RH"];
  rh.forEach((messure) => {
    data[messure["ts"]]["RH"] = messure["value"];
  });
  const temp = response["Temp"];
  temp.forEach((messure) => {
    data[messure["ts"]]["Temp"] = messure["value"];
  });
  const wd = response["WD"];
  wd.forEach((messure) => {
    data[messure["ts"]]["WD"] = messure["value"];
  });
  return data;
};
