"use client";
import { useContext } from "react";
import { MqttContext } from "./MqttProvider";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

export default function StatusIndicator() {
  const { isConnected } = useContext(MqttContext);

  return (
    <div className="mb-6 flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg shadow-md text-white">
      {isConnected ? (
        <>
          <FaCheckCircle className="text-green-400" size={20} />
          <span className="text-sm sm:text-base">Conectado ao MQTT</span>
        </>
      ) : (
        <>
          <FaTimesCircle className="text-red-400" size={20} />
          <span className="text-sm sm:text-base">Desconectado</span>
        </>
      )}
    </div>
  );
}
