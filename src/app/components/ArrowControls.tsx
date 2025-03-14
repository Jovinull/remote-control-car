"use client";
import { useContext, useState, useEffect } from "react";
import { MqttContext } from "./MqttProvider";
import { FaLongArrowAltUp, FaLongArrowAltDown, FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { IoStopSharp } from "react-icons/io5";

// Pegando o tópico do `.env`
const MQTT_TOPIC = process.env.NEXT_PUBLIC_MQTT_TOPIC!;

export default function ArrowControls() {
  const { client, isConnected } = useContext(MqttContext);
  const [activeDirection, setActiveDirection] = useState<string | null>(null);
  const [lastCommand, setLastCommand] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (activeDirection && isConnected && client) {
      interval = setInterval(() => {
        client.publish(MQTT_TOPIC, activeDirection, { qos: 0, retain: false });
        setLastCommand(activeDirection);
        console.log(`📤 Enviando comando contínuo: ${activeDirection}`);
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeDirection, isConnected, client]);

  const handlePress = (direction: string) => {
    if (!isConnected) {
      console.error("🚨 Tentando enviar comando antes da conexão MQTT!");
      return;
    }
    setActiveDirection(direction);
  };

  const handleRelease = () => {
    setActiveDirection(null);
  };

  const handleBrake = () => {
    if (!isConnected || !client) return;

    console.log("🛑 Aplicando freio, limpando o tópico...");
    client.publish(MQTT_TOPIC, "", { qos: 0, retain: true }); // Apaga qualquer comando anterior
    setLastCommand("Freio aplicado");
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Indicador de Último Comando */}
      <div className="text-white text-lg font-semibold bg-gray-800 px-4 py-2 rounded-md shadow-md">
        Último comando: {lastCommand}
      </div>

      {/* Controles de Direção */}
      <div className="grid grid-cols-3 gap-4">
        <button
          onMouseDown={() => handlePress("LEFT")}
          onMouseUp={handleRelease}
          onMouseLeave={handleRelease}
          className={`p-6 text-white rounded-lg shadow-xl flex items-center justify-center transition-transform duration-100 ${activeDirection === "LEFT"
              ? "bg-blue-700 animate-pulse scale-105"
              : "bg-blue-600 hover:bg-blue-700 active:scale-95"
            }`}
        >
          <FaLongArrowAltLeft size={40} />
        </button>

        <button
          onMouseDown={() => handlePress("UP")}
          onMouseUp={handleRelease}
          onMouseLeave={handleRelease}
          className={`p-6 text-white rounded-lg shadow-xl flex items-center justify-center transition-transform duration-100 ${activeDirection === "UP"
              ? "bg-green-700 animate-pulse scale-105"
              : "bg-green-600 hover:bg-green-700 active:scale-95"
            }`}
        >
          <FaLongArrowAltUp size={40} />
        </button>

        <button
          onMouseDown={() => handlePress("RIGHT")}
          onMouseUp={handleRelease}
          onMouseLeave={handleRelease}
          className={`p-6 text-white rounded-lg shadow-xl flex items-center justify-center transition-transform duration-100 ${activeDirection === "RIGHT"
              ? "bg-red-700 animate-pulse scale-105"
              : "bg-red-600 hover:bg-red-700 active:scale-95"
            }`}
        >
          <FaLongArrowAltRight size={40} />
        </button>

        <button
          onMouseDown={() => handlePress("DOWN")}
          onMouseUp={handleRelease}
          onMouseLeave={handleRelease}
          className={`col-span-3 p-6 text-white rounded-lg shadow-xl flex items-center justify-center transition-transform duration-100 ${activeDirection === "DOWN"
              ? "bg-yellow-700 animate-pulse scale-105"
              : "bg-yellow-500 hover:bg-yellow-600 active:scale-95"
            }`}
        >
          <FaLongArrowAltDown size={40} />
        </button>
      </div>

      {/* Botão de Freio */}
      <button
        onClick={handleBrake}
        className="p-6 bg-red-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-red-400 active:scale-90 transition-transform duration-75"
      >
        <IoStopSharp size={50} />
      </button>
    </div>
  );
}
