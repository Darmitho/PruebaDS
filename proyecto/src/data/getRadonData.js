import { getToken } from "./getToken.js";

export const getRadonResponse = async () => {
  try {
    const response = await fetch(
      "http://18.214.103.65:8080/api/plugins/telemetry/DEVICE/723d0580-452d-11ed-b4b1-1bcb8f5daa77/values/timeseries?keys=Fecha,Radon&startTs=1265046352083&endTs=1665029708303",
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

export const getRadonData = (response) => {
  const data = {};
  const fechas = response["Fecha"];
  fechas.forEach((fecha) => {
    data[fecha["ts"]] = { Fecha: fecha["value"] };
  });
  const radon = response["Radon"];
  radon.forEach((rad) => {
    data[rad["ts"]]["Radon"] = rad["value"];
  });
  return data;
};
