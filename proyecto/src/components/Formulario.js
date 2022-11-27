import React, { useEffect, useRef, useState, useContext } from "react";
import { FaAngleDown } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import moment from "moment";
function Formulario() {
  const [spinnerOpen, setSpinnerOpen] = useState(false);
  const initialDateRef = useRef();
  const finalDateRef = useRef();

  const {
    sensorInputRef,
    sensors,
    currentSensor,
    setCurrentSensor,
    setRequiredSensor,
  } = useContext(AppContext);

  const selectSensor = (sensor) => {
    setCurrentSensor(sensor);
    setSpinnerOpen(false);
  };

  useEffect(() => {
    if (currentSensor) {
      sensorInputRef.current.value = sensors[currentSensor];
    }
  }, [currentSensor, sensors, sensorInputRef]);

  const loadSpinner = () => {
    if (spinnerOpen) {
      return (
        <section>
          <section
            onClick={() => {
              selectSensor("radon");
            }}
            className="bg-slate-200 p-3 w-full opacity-80 hover:opacity-100 relative mt-3 cursor-pointer"
          >
            Sensor de Radon
          </section>
          <section
            onClick={() => {
              selectSensor("multiparametro");
            }}
            className="bg-slate-200 p-3 w-full opacity-80 hover:opacity-100 relative mt-3 cursor-pointer"
          >
            Sensor Multiparametro
          </section>
          <section
            onClick={() => {
              selectSensor("bc-magee");
            }}
            className="bg-slate-200 p-3 w-full opacity-80 hover:opacity-100 relative mt-3 cursor-pointer"
          >
            Sensor BC-Magee <span>&#40;</span> Black Carbon <span>&#41;</span>
          </section>
          <section
            onClick={() => {
              selectSensor("bc-maap");
            }}
            className="bg-slate-200 p-3 w-full opacity-80 hover:opacity-100 relative mt-3 cursor-pointer"
          >
            Sensor BC-MAAP <span>&#40;</span> Black Carbon <span>&#41;</span>
          </section>
          <section
            onClick={() => {
              selectSensor("radiometro");
            }}
            className="bg-slate-200 p-3 w-full opacity-80 hover:opacity-100 relative mt-3 cursor-pointer"
          >
            Sensor Radiómetro
          </section>
          <section
            onClick={() => {
              selectSensor("mp-grimm");
            }}
            className="bg-slate-200 p-3 w-full opacity-80 hover:opacity-100 relative mt-3 cursor-pointer"
          >
            Sensor MP-Grimm
          </section>
        </section>
      );
    } else {
      return null;
    }
  };

  const submitRequest = () => {
    if (
      currentSensor &&
      initialDateRef.current.value &&
      finalDateRef.current.value
    ) {
      setRequiredSensor({
        sensor: currentSensor,
        initial_date: moment(initialDateRef.current.value, "YYYY-MM-DDTHH:mm"),
        final_date: moment(finalDateRef.current.value, "YYYY-MM-DDTHH:mm"),
      });
    }
  };

  return (
    <div className="flex flex-col place-content-center items-center py-20 relative">
      <form className="flex-col gap-3 bg-slate-50 py-10 px-14 rounded shadow-lg shadow-slate-400/40">
        <section className="flex justify-between gap-3 w-full">
          <section>
            <h2>
              Fecha inicial <span className="text-red-800">*</span>
            </h2>
            <input
              ref={initialDateRef}
              type="datetime-local"
              required=""
              className="bg-slate-200 p-3"
            ></input>
          </section>
          <section>
            <h2>
              Fecha final <span className="text-red-800">*</span>
            </h2>
            <input
              ref={finalDateRef}
              type="datetime-local"
              required=""
              className="bg-slate-200 p-3"
            ></input>
            <button />
          </section>
        </section>
        <section className="flex items-center relative h-fit w-full mt-3 justify-end">
          <input
            ref={sensorInputRef}
            id="sensor"
            value=""
            name="sensor"
            type="text"
            disabled
            required=""
            placeholder="Tipo de Sensor ----"
            className="bg-slate-200 p-3 w-full relative"
          />
          <button
            type="button"
            className="absolute p-4 hover:inset-y-1 hover:animate-bounce "
            onClick={() => {
              setSpinnerOpen(true);
            }}
          >
            <FaAngleDown />
          </button>
        </section>
        {loadSpinner()}
        <section className="flex place-content-center mt-5">
          <button
            type="button"
            className="p-3 rounded bg-gray-200 w-full active:bg-gray-400 active:text-white opacity-80 hover:opacity-100 transition-colors"
            onClick={submitRequest}
          >
            Enviar
          </button>
        </section>
      </form>
    </div>
  );
}

export default Formulario;
