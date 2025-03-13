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

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (activeDirection && isConnected && client) {
      interval = setInterval(() => {
        client.publish(MQTT_TOPIC, activeDirection, { qos: 0, retain: false });
        console.log(`Enviando comando contínuo: ${activeDirection}`);
      }, 100); // Comando enviado a cada 100ms
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeDirection, isConnected, client]);

  const handlePress = (direction: string) => {
    if (!isConnected) {
      console.error("Tentando enviar comando antes da conexão MQTT!");
      return;
    }
    setActiveDirection(direction);
  };

  const handleRelease = () => {
    setActiveDirection(null);
  };

  const handleBrake = () => {
    if (!isConnected || !client) return;
    
    console.log("Aplicando freio, limpando o tópico...");
    client.publish(MQTT_TOPIC, "", { qos: 0, retain: true }); // Apaga qualquer comando anterior
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-3 gap-4">
        <button
          onMouseDown={() => handlePress("LEFT")}
          onMouseUp={handleRelease}
          onMouseLeave={handleRelease}
          className="p-6 bg-blue-600 text-white rounded-lg shadow-xl flex items-center justify-center hover:bg-blue-700 active:scale-90 transition-transform duration-75"
        >
          <FaLongArrowAltLeft size={40} />
        </button>

        <button
          onMouseDown={() => handlePress("UP")}
          onMouseUp={handleRelease}
          onMouseLeave={handleRelease}
          className="p-6 bg-green-600 text-white rounded-lg shadow-xl flex items-center justify-center hover:bg-green-700 active:scale-90 transition-transform duration-75"
        >
          <FaLongArrowAltUp size={40} />
        </button>

        <button
          onMouseDown={() => handlePress("RIGHT")}
          onMouseUp={handleRelease}
          onMouseLeave={handleRelease}
          className="p-6 bg-red-600 text-white rounded-lg shadow-xl flex items-center justify-center hover:bg-red-700 active:scale-90 transition-transform duration-75"
        >
          <FaLongArrowAltRight size={40} />
        </button>

        <button
          onMouseDown={() => handlePress("DOWN")}
          onMouseUp={handleRelease}
          onMouseLeave={handleRelease}
          className="col-span-3 p-6 bg-yellow-500 text-white rounded-lg shadow-xl flex items-center justify-center hover:bg-yellow-600 active:scale-90 transition-transform duration-75"
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
