import { getToken } from "./getToken.js";

export const getMageeResponse = async () => {
  try {
    const response = await fetch(
      "http://18.214.103.65:8080/api/plugins/telemetry/DEVICE/8c5ad790-454f-11ed-b4b1-1bcb8f5daa77/values/timeseries?keys=Date,Time,BC1,BC2,BC3,BC4,BC5,BC6,BC7&startTs=1265046352083&endTs=1665044358966",
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

export const getMageeData = (response) => {
  const data = {};
  const dates = response["Date"];
  dates.forEach((date) => {
    data[date["ts"]] = { Fecha: date["value"] };
  });
  const times = response["Time"];
  times.forEach((time) => {
    data[time["ts"]]["Time"] = time["value"];
  });
  const messures = response["BC1"];
  messures.forEach((messure) => {
    data[messure["ts"]]["BC1"] = messure["value"];
  });
  return data;
};
